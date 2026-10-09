import { HOTSPOTS as DEFAULT_HOTSPOTS, DEVICE_CONSTANTS, type Hotspot } from '../data/hotspots';

export function initDeviceExplode(): () => void {
  const { TOTAL_FRAMES, BASE_PATH, HS_SHOW_AT, HS_HIDE_BELOW } = DEVICE_CONSTANTS;

  // Read i18n data passed from Astro component if available
  const i18nScript = document.getElementById('device-i18n-data');
  const i18nData = i18nScript ? JSON.parse(i18nScript.textContent || '{}') : {};
  const HOTSPOTS: Hotspot[] = i18nData.hotspots || DEFAULT_HOTSPOTS;
  const closeLabel: string = i18nData.closeLabel || 'Cerrar';
  const infoPrefix: string = i18nData.infoPrefix || 'Información de';

  const stage        = document.getElementById('device-scroll-stage');
  const canvasArea   = document.getElementById('canvas-area');
  const canvasEl     = document.querySelector<HTMLCanvasElement>('#device-canvas');
  const scrollHint   = document.getElementById('scroll-hint');
  const progressBar  = document.getElementById('device-progress-bar');
  const hotspotLayer = document.getElementById('hotspot-layer');
  const svgEl        = document.querySelector<SVGElement>('#mindmap-svg');
  const bubblesDiv   = document.getElementById('mindmap-bubbles') as HTMLElement | null;

  if (!canvasEl || !stage || !canvasArea) return () => {};
  const ctx = canvasEl.getContext('2d');
  if (!ctx) return () => {};

  const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
  let loadedCount   = 0;
  let allLoaded     = false;
  let displayFrame  = 0;
  let targetFrame   = 0;
  let rafId: number | null = null;
  let hintDismissed = false;
  let hsVisible     = false;
  let activeId: string | null = null;
  let lastFocusEl: HTMLElement | null = null;
  let lastZone: 'top' | 'bottom' | null = null;
  let sameZoneCount = 0;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getImageRect = () => {
    const ref = images[TOTAL_FRAMES - 1] || images[0];
    if (!ref || !ref.naturalWidth) return null;
    const cw = canvasArea.clientWidth;
    const ch = canvasArea.clientHeight;
    const vPad = cw < 640 ? 140 : 180;
    const availH = Math.max(200, ch - 2 * vPad);

    const ir = ref.naturalWidth / ref.naturalHeight;
    const cr = cw / availH;
    let dw: number, dh: number, ox: number, oy: number;

    if (cr > ir) {
      dh = availH;
      dw = availH * ir;
      ox = (cw - dw) / 2;
      oy = vPad;
    } else {
      dw = cw;
      dh = cw / ir;
      ox = 0;
      oy = vPad + (availH - dh) / 2;
    }
    return { left: ox, top: oy, width: dw, height: dh };
  };

  const drawFrame = (idx: number) => {
    const targetIdx = Math.max(0, Math.min(idx, TOTAL_FRAMES - 1));
    let img = images[targetIdx];
    if (!img || !img.complete || !img.naturalWidth) {
      for (let j = targetIdx - 1; j >= 0; j--) {
        if (images[j] && images[j].complete && images[j].naturalWidth) {
          img = images[j];
          break;
        }
      }
    }
    if (!img || !img.complete || !img.naturalWidth) {
      for (let j = targetIdx + 1; j < TOTAL_FRAMES; j++) {
        if (images[j] && images[j].complete && images[j].naturalWidth) {
          img = images[j];
          break;
        }
      }
    }
    if (!img || !img.complete || !img.naturalWidth) return;
    const cw = canvasEl.width, ch = canvasEl.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const rect = getImageRect();
    if (!rect) return;

    const ox = rect.left * dpr;
    const oy = rect.top * dpr;
    const dw = rect.width * dpr;
    const dh = rect.height * dpr;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, dw, dh);
  };

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r   = canvasEl.getBoundingClientRect();
    canvasEl.width  = r.width  * dpr;
    canvasEl.height = r.height * dpr;
    drawFrame(Math.round(displayFrame));
  };

  const loadFrame = (i: number) => {
    const img = new Image();
    img.src = BASE_PATH + String(i + 1).padStart(3, '0') + '.jpg';
    img.onload = img.onerror = () => {
      images[i] = img;
      loadedCount++;
      if (i === 0) { resizeCanvas(); drawFrame(0); }
      if (loadedCount === TOTAL_FRAMES) {
        allLoaded = true;
        repositionHotspots();
      }
    };
  };

  loadFrame(0);
  for (let i = 1; i < TOTAL_FRAMES; i++) loadFrame(i);

  const injectHotspots = () => {
    if (!hotspotLayer || document.querySelector('.hotspot-btn')) return;
    HOTSPOTS.forEach((h, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id   = 'hsbtn-' + h.id;
      btn.dataset.id = h.id;
      btn.className  = 'hotspot-btn';
      btn.setAttribute('aria-label', h.name);
      btn.setAttribute('aria-expanded', 'false');
      btn.style.transitionDelay = (idx * 50) + 'ms';
      btn.innerHTML = `
        <span class="hs-num">${idx + 1}</span>
        <span class="sr-only">${h.name}</span>
      `;
      btn.addEventListener('click', () => toggleMindMap(h.id, btn));
      hotspotLayer.appendChild(btn);
      requestAnimationFrame(() => requestAnimationFrame(() => btn.classList.add('hs-visible')));
    });
  };

  const repositionHotspots = () => {
    const rect = getImageRect();
    if (!rect) return;
    document.querySelectorAll('.hotspot-btn').forEach(el => {
      const btn = el as HTMLElement;
      const h = HOTSPOTS.find(x => x.id === btn.dataset.id);
      if (!h) return;
      btn.style.left = (rect.left + (h.left / 100) * rect.width)  + 'px';
      btn.style.top  = (rect.top  + (h.top  / 100) * rect.height) + 'px';
    });
    if (activeId) {
      const b = document.getElementById('hsbtn-' + activeId) as HTMLElement | null;
      if (b) openMindMap(activeId, b, false);
    }
  };

  const showHotspots = () => {
    if (hsVisible || !hotspotLayer) return;
    hsVisible = true;
    injectHotspots();
    repositionHotspots();
    hotspotLayer.removeAttribute('aria-hidden');
    hotspotLayer.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
    hotspotLayer.classList.add('opacity-100', 'visible');
    
    if (!activeId) {
      const btn1 = document.getElementById('hsbtn-cubierta-frontal');
      openMindMap('cubierta-frontal', btn1, false);
    }
  };

  const hideHotspots = () => {
    if (!hsVisible || !hotspotLayer) return;
    hsVisible = false;
    hotspotLayer.setAttribute('aria-hidden', 'true');
    hotspotLayer.classList.remove('opacity-100', 'visible');
    hotspotLayer.classList.add('opacity-0', 'invisible', 'pointer-events-none');
    closeMindMap(false);
  };

  const drawBezierCurve = (x1: number, y1: number, x2: number, y2: number, isTop: boolean, mobile: boolean) => {
    if (!svgEl) return;
    svgEl.innerHTML = '';

    const dx = (mobile ? 25 : 55) * (x2 >= x1 ? 1 : -1);
    const dy = Math.abs(y1 - y2) * 0.45;

    const c1x = x1 + dx;
    const c1y = y1 + (isTop ? -dy * 0.3 : dy * 0.3);
    const c2x = x2;
    const c2y = y2 + (isTop ? dy : -dy);

    const d = `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', '#0F2A6B');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    svgEl.appendChild(path);

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', String(x2));
    dot.setAttribute('cy', String(y2));
    dot.setAttribute('r', '3');
    dot.setAttribute('fill', '#0F2A6B');
    svgEl.appendChild(dot);

    if (!reduced && 'getTotalLength' in path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray  = String(len);
      path.style.strokeDashoffset = String(len);
      path.style.transition = 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0';
      });
    }
  };

  const closeMindMap = (returnFocus: boolean = true) => {
    if (!svgEl || !bubblesDiv) return;
    svgEl.innerHTML      = '';
    bubblesDiv.innerHTML = '';
    if (activeId) {
      const btn = document.getElementById('hsbtn-' + activeId);
      if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.classList.remove('active'); }
      if (returnFocus !== false && lastFocusEl) { lastFocusEl.focus({ preventScroll: true }); lastFocusEl = null; }
    }
    activeId = null;
  };

  const openMindMap = (id: string, triggerBtn: HTMLElement | null = null, animate: boolean = true) => {
    const h = HOTSPOTS.find(x => x.id === id);
    if (!h || !svgEl || !bubblesDiv) return;

    const idx = HOTSPOTS.findIndex(x => x.id === id);

    svgEl.innerHTML      = '';
    bubblesDiv.innerHTML = '';
    activeId    = id;
    lastFocusEl = triggerBtn;

    document.querySelectorAll('.hotspot-btn').forEach(el => {
      const b = el as HTMLElement;
      const on = b.dataset.id === id;
      b.setAttribute('aria-expanded', on ? 'true' : 'false');
      b.classList.toggle('active', on);
    });

    const imgRect = getImageRect();
    if (!imgRect) return;
    const aw = canvasArea.clientWidth;
    const ah = canvasArea.clientHeight;
    const px = imgRect.left + (h.left / 100) * imgRect.width;
    const py = imgRect.top  + (h.top  / 100) * imgRect.height;

    const mobile   = aw < 640;
    const bubbleW  = mobile ? Math.min(aw * 0.88, 300) : 320;
    const bubbleH  = 120;

    let zone: 'top' | 'bottom';
    let offsetX = 0;

    if (id === 'cubierta-frontal') {
      zone = 'bottom';
      offsetX = -10;
    } else if (id === 'cubierta-trasera') {
      zone = 'top';
      offsetX = +10;
    } else {
      const probTop = h.top < 45 ? 0.70 : 0.30;
      let chosen: 'top' | 'bottom' = (Math.random() < probTop) ? 'top' : 'bottom';

      if (chosen === lastZone && sameZoneCount >= 2) {
        chosen = chosen === 'top' ? 'bottom' : 'top';
      }

      if (chosen === lastZone) {
        sameZoneCount++;
      } else {
        lastZone = chosen;
        sameZoneCount = 1;
      }

      zone = chosen;
      offsetX = (Math.random() * 20 - 10);
    }

    let bx = px + (offsetX / 100) * aw;
    bx = Math.max(16 + bubbleW / 2, Math.min(aw - 16 - bubbleW / 2, bx));

    const imgTop = imgRect.top;
    const imgBottom = imgRect.top + imgRect.height;

    let by: number;
    if (zone === 'top') {
      by = imgTop - bubbleH - 16;
      if (by < 12) {
        zone = 'bottom';
        by = imgBottom + 16;
      }
    } else {
      by = imgBottom + 16;
      if (by + bubbleH > ah - 12) {
        zone = 'top';
        by = imgTop - bubbleH - 16;
      }
    }

    const isTop = zone === 'top';
    const targetY = isTop ? (by + bubbleH) : by;
    const targetX = Math.max(bx - bubbleW / 2 + 20, Math.min(bx + bubbleW / 2 - 20, px));

    drawBezierCurve(px, py, targetX, targetY, isTop, mobile);

    const anim = animate && !reduced;
    const bubble = document.createElement('div');
    bubble.id = 'mindmap-bubble-card';
    bubble.setAttribute('role', 'region');
    bubble.setAttribute('aria-live', 'polite');
    bubble.setAttribute('aria-label', (infoPrefix ? infoPrefix + ' ' : 'Información de ') + h.name);
    bubble.tabIndex = -1;

    bubble.style.cssText =
      'position:absolute;pointer-events:auto;z-index:40;' +
      'left:' + bx + 'px;top:' + by + 'px;' +
      'transform:translate(-50%, 0) scale(' + (anim ? '0.92' : '1') + ');' +
      'opacity:' + (anim ? '0' : '1') + ';' +
      'transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;' +
      'width:' + bubbleW + 'px;';

    bubble.innerHTML = `
      <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:1rem;padding:0.85rem 1.1rem;box-shadow:0 12px 28px -6px rgba(15,42,107,0.14), 0 0 0 1px rgba(0,0,0,0.02);">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
          <div style="display:flex;align-items:center;gap:8px;min-width:0;">
            <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#0F2A6B;color:#FFFFFF;font-family:var(--font-display, sans-serif);font-size:0.75rem;font-weight:700;flex-shrink:0;">
              ${idx + 1}
            </span>
            <strong style="font-family:var(--font-display, sans-serif);font-weight:700;font-size:0.88rem;color:#0F2A6B;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${h.name}
            </strong>
          </div>

          <button type="button" class="close-bubble" aria-label="${closeLabel}"
            style="width:22px;height:22px;display:flex;align-items:center;justify-content:center;background:#F1F5F9;border:none;cursor:pointer;color:#64748B;border-radius:50%;transition:all 0.2s;flex-shrink:0;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <p style="font-family:var(--font-display, sans-serif);font-weight:400;font-size:0.78rem;color:#334155;line-height:1.45;margin:0 0 8px;">
          ${h.desc}
        </p>

        <div style="display:inline-flex;align-items:center;gap:5px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:999px;padding:3px 10px;font-family:var(--font-display, sans-serif);font-size:0.7rem;font-weight:600;color:#334155;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F2A6B" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          <span>${h.tech}</span>
        </div>
      </div>
    `;

    bubblesDiv.appendChild(bubble);

    if (anim) {
      requestAnimationFrame(() => {
        bubble.style.transform = 'translate(-50%, 0) scale(1)';
        bubble.style.opacity = '1';
      });
    }

    const closeBtn = bubble.querySelector('.close-bubble');
    if (closeBtn) closeBtn.addEventListener('click', () => closeMindMap(true));
  };

  const toggleMindMap = (id: string, btn: HTMLElement | null = null) => {
    if (activeId === id) closeMindMap(true);
    else openMindMap(id, btn, true);
  };

  const updateTarget = () => {
    if (!stage) return;
    const r        = stage.getBoundingClientRect();
    const scrollable = stage.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -r.top);
    const progress = Math.min(1, scrollable > 0 ? scrolled / scrollable : 0);
    targetFrame = progress * (TOTAL_FRAMES - 1);
    if (progressBar) progressBar.style.width = (progress * 100) + '%';
    if (!hintDismissed && progress > 0.02) {
      hintDismissed = true;
      if (scrollHint) scrollHint.style.opacity = '0';
    }
    if (allLoaded) {
      if (progress >= HS_SHOW_AT)  showHotspots();
      else if (progress < HS_HIDE_BELOW) hideHotspots();
    }
  };

  const LERP = reduced ? 1 : 0.12;
  const loop = () => {
    rafId = requestAnimationFrame(loop);
    updateTarget();
    displayFrame += (targetFrame - displayFrame) * LERP;
    drawFrame(Math.round(displayFrame));
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && activeId) closeMindMap(true);
  };

  const handlePointerdown = (e: Event) => {
    if (!activeId) return;
    const target = e.target as HTMLElement | null;
    if (target && !target.closest('#hotspot-layer')) closeMindMap(true);
  };

  const handleResize = () => {
    resizeCanvas();
    repositionHotspots();
  };

  window.addEventListener('scroll', updateTarget, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('pointerdown', handlePointerdown, { passive: true });

  resizeCanvas();
  loop();

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    window.removeEventListener('scroll', updateTarget);
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('pointerdown', handlePointerdown);
  };
}
