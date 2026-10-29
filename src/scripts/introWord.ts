// Scroll-driven "Alivia" intro: the word is cut out of a navy panel and the
// camera dives into the stem of its first "i" until the hero fills the screen.
// <html data-intro="pending|done"> gates the panel, the hero cards and the navbar.

// Must match the <svg viewBox> and <text> attributes in HeroAnimation.astro.
const VIEW_W = 1000;
const VIEW_H = 800;
const FONT_SIZE = 300;
const BASELINE = 505;
const DIVE_CHAR = 2; // the first "i", next to the word's centre

const HOLD = 0.08; // word sits still for a beat before the camera moves
const FADE_FROM = 0.85; // panel fades out at the end, so no sliver of navy ever lingers

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

export function initIntroWord(): () => void {
  const root = document.documentElement;
  const intro = document.getElementById("alivia-intro");
  const track = document.getElementById("scroll-track");
  const viewport = document.getElementById("hero-viewport");
  const marker = document.getElementById("intro-end");
  const zoom = intro?.querySelector<SVGSVGElement>("[data-zoom]");
  const measureText = intro?.querySelector<SVGTextElement>("[data-measure]");
  if (!intro || !track || !viewport || !marker || !zoom || !measureText) {
    root.dataset.intro = "done";
    return () => {};
  }

  const hint = intro.querySelector<HTMLElement>("[data-hint]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let start = 0;
  let end = 0;
  let maxScale = 60;
  let last = -1;
  let rafId: number | null = null;

  const progress = () => (end > start ? clamp((window.scrollY - start) / (end - start)) : 1);

  const render = () => {
    rafId = null;
    const p = progress();
    if (p === last) return;
    last = p;

    if (hint) hint.style.opacity = String(1 - clamp(p / 0.12));

    if (reduce) {
      // No camera move: the panel simply fades away.
      intro.style.opacity = String(1 - clamp((p - HOLD) / (1 - HOLD)));
    } else {
      // Exponential zoom reads as constant camera speed; the curve eases it in and out.
      const t = easeInOutCubic(clamp((p - HOLD) / (1 - HOLD)));
      zoom.style.transform = `scale(${maxScale ** t})`;
      intro.style.opacity = String(1 - clamp((p - FADE_FROM) / (1 - FADE_FROM)));
    }

    const state = p >= 1 ? "done" : "pending";
    if (root.dataset.intro !== state) root.dataset.intro = state;
  };

  const schedule = () => {
    if (rafId === null) rafId = requestAnimationFrame(render);
  };

  const measure = () => {
    start = track.getBoundingClientRect().top + window.scrollY;
    end = marker.getBoundingClientRect().top + window.scrollY;

    // Map the dive point (inside the "i" stem, under the x-height) from viewBox units to px.
    const w = zoom.clientWidth;
    const h = zoom.clientHeight;
    const unit = Math.min(w / VIEW_W, h / VIEW_H);
    const char = measureText.getExtentOfChar(DIVE_CHAR);
    const ox = (w - VIEW_W * unit) / 2 + (char.x + char.width / 2) * unit;
    const oy = (h - VIEW_H * unit) / 2 + (BASELINE - FONT_SIZE * 0.22) * unit;
    zoom.style.transformOrigin = `${ox}px ${oy}px`;

    // Scale at which the stem (~35% of the glyph box wide, ~0.4em tall) covers the screen.
    // The word sits in the small viewport; the stem must also cover the strip the
    // URL bar leaves when it collapses, which the panel itself (intro) reaches.
    const halfStemW = char.width * 0.175 * unit;
    const halfStemH = FONT_SIZE * 0.2 * unit;
    const coverH = Math.max(h, intro.clientHeight);
    maxScale = 1.1 * Math.max(Math.max(ox, w - ox) / halfStemW, Math.max(oy, coverH - oy) / halfStemH);

    last = -1;
    schedule();
  };

  // Tabbing into a hero CTA hidden under the panel: finish the intro so focus is visible.
  const onFocusIn = (e: FocusEvent) => {
    if (progress() < 1 && !intro.contains(e.target as Node)) window.scrollTo(0, end);
  };

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(document.body);
  window.addEventListener("scroll", schedule, { passive: true });
  viewport.addEventListener("focusin", onFocusIn);
  measure();
  // Glyph metrics change once Outfit arrives.
  document.fonts?.ready.then(measure);

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    resizeObserver.disconnect();
    window.removeEventListener("scroll", schedule);
    viewport.removeEventListener("focusin", onFocusIn);
  };
}
