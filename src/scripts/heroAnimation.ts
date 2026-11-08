import { createVisibleLoop } from "./frameSequence";
import { CLIP_COUNT, XFADE, buildTimeline, textWindow } from "./heroTimeline";

const CLIP_BASE = "/hero/clips/";
// Fallbacks until the real metadata arrives (seconds, frames per second).
const CLIP_DURATION = [7.9167, 7.9167, 7.9167, 7.9167, 7.9167, 4.0333];
const CLIP_FPS = [24, 24, 24, 24, 24, 30];
const FOLLOW = 10; // how fast the camera chases the scroll position (1/s)

// Horizontal object-position (%) at the start and end of each clip, so the subject
// stays in view when the 16:9 frame is cropped on a tall screen.
const FOCUS_X: [number, number][] = [
  [2, 50], // device on the wall -> woman centred
  [50, 5], // woman -> lit ring
  [45, 45], // door opening
  [45, 64], // woman and door
  [30, 36], // living room -> kitchen
  [66, 66], // closing shot
];

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

interface Clip {
  el: HTMLVideoElement;
  want: number | null;
  attached: boolean;
}

export function initHeroAnimation(): () => void {
  const root = document.documentElement;
  const scrollTrack = document.getElementById("scroll-track");
  const stage = document.getElementById("hero-viewport");
  const media = document.getElementById("hero-media");
  const videos = media ? Array.from(media.querySelectorAll<HTMLVideoElement>("video")) : [];

  if (!scrollTrack || !stage || !media || videos.length !== CLIP_COUNT) return () => {};

  // Reduced motion / data saver: stills only, no scrub (layout handled in CSS).
  if (root.dataset.heroStill) {
    return () => {};
  }

  const stops = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]"));
  const railLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-goto]"));
  const railFill = document.querySelector<HTMLElement>("[data-rail-fill]");
  const hint = document.querySelector<HTMLElement>("[data-paseo-hint]");

  const clips: Clip[] = videos.map((el) => ({ el, want: null, attached: false }));

  let isMobile = window.innerWidth < 768;
  let tl = buildTimeline(isMobile);
  let trackTop = 0;
  let unit = 1; // px of scroll per svh of timeline
  let pos = 0;
  let lastT: number | null = null;
  let focus = -1;
  const stopStates: (boolean | undefined)[] = [];
  let railIndex = -1;
  let lastFill = -1;
  let hintGone = false;
  let hasText = false;
  let side = "";
  const alphas: number[] = new Array(CLIP_COUNT).fill(-1);
  const focusX: number[] = new Array(CLIP_COUNT).fill(-1);
  let lastMaskStop = -1;
  let destroyed = false;

  const stageH = () => stage.clientHeight || window.innerHeight;

  const measure = () => {
    isMobile = window.innerWidth < 768;
    tl = buildTimeline(isMobile);
    const rect = scrollTrack.getBoundingClientRect();
    trackTop = rect.top + window.scrollY;
    unit = Math.max(1, (rect.height - stageH()) / tl.total);
    stopStates.length = 0;
    loop.wake();
  };

  /* ---- Loading: nearest clips first, nothing blocks the first render ---- */

  const attach = (c: Clip, i: number) => {
    if (c.attached) return;
    c.attached = true;
    // Only the 1080p encodes are served, on every screen size.
    c.el.src = `${CLIP_BASE}clip${i + 1}.mp4`;
  };

  const deferred: number[] = [];
  let pumping = false;
  const pump = () => {
    if (pumping || destroyed) return;
    const i = deferred.shift();
    if (i === undefined) return;
    pumping = true;
    const c = clips[i];
    const done = () => {
      pumping = false;
      pump();
    };
    c.el.addEventListener("loadedmetadata", done, { once: true });
    c.el.addEventListener("error", done, { once: true });
    attach(c, i);
  };

  const setFocus = (cur: number) => {
    if (cur === focus) return;
    focus = cur;
    const order = [cur, cur + 1, cur - 1];
    for (let d = 2; d < CLIP_COUNT; d++) order.push(cur + d, cur - d);
    order
      .filter((i, k) => i >= 0 && i < CLIP_COUNT && order.indexOf(i) === k)
      .forEach((i, rank) => {
        const c = clips[i];
        const preload = rank < 2 ? "auto" : "metadata";
        if (c.el.preload !== preload) c.el.preload = preload;
        if (rank < 3) attach(c, i);
        else if (!c.attached && !deferred.includes(i)) deferred.push(i);
      });
    // The rest trickles in once the page has loaded, and only on a fast connection.
    if (fastLink && document.readyState === "complete") pump();
  };
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  const fastLink = !conn?.effectiveType || conn.effectiveType === "4g";
  const onLoad = () => fastLink && pump();
  window.addEventListener("load", onLoad, { once: true });

  /* ---- Seeking: one seek in flight per video, always aimed at the latest time ---- */

  const duration = (i: number) => {
    const d = clips[i].el.duration;
    return Number.isFinite(d) && d > 0 ? d : CLIP_DURATION[i];
  };

  const flush = (c: Clip) => {
    const v = c.el;
    if (c.want === null || v.seeking || v.readyState < 1) return;
    if (Math.abs(v.currentTime - c.want) > 0.5 / 30) v.currentTime = c.want;
    c.want = null;
  };

  const seekTo = (i: number, t: number) => {
    const c = clips[i];
    c.want = t;
    flush(c);
  };

  const listeners: [HTMLVideoElement, string, () => void][] = [];
  clips.forEach((c) => {
    const fn = () => flush(c);
    ["loadedmetadata", "seeked"].forEach((ev) => {
      c.el.addEventListener(ev, fn);
      listeners.push([c.el, ev, fn]);
    });
  });

  // iOS paints a seeked frame only for videos that have been played once.
  const prime = () => {
    clips.forEach((c) => {
      if (!c.attached) return;
      c.el.play().then(() => c.el.pause()).catch(() => {});
    });
  };
  window.addEventListener("touchstart", prime, { once: true, passive: true });

  /* ---- Rendering ---- */

  const setFocusX = (i: number, frac: number) => {
    const [a, b] = FOCUS_X[i];
    const x = Math.round((a + (b - a) * smooth(frac)) * 2) / 2;
    if (focusX[i] === x) return;
    focusX[i] = x;
    clips[i].el.style.objectPosition = `${x}% 50%`;
  };

  const lastTime = (i: number) => Math.max(0, duration(i) - 0.5 / CLIP_FPS[i]);

  const render = () => {
    const seg = tl.segments.find((s) => pos < s.end) ?? tl.segments[tl.segments.length - 1];
    const want: number[] = new Array(CLIP_COUNT).fill(0);

    if (seg.kind === "clip") {
      const frac = clamp((pos - seg.start) / (seg.end - seg.start));
      want[seg.n] = 1;
      seekTo(seg.n, frac * lastTime(seg.n));
      setFocusX(seg.n, frac);
      setFocus(seg.n);
    } else {
      const k = seg.n;
      if (k === 0) {
        want[0] = 1;
        seekTo(0, 0);
        setFocusX(0, 0);
        setFocus(0);
      } else {
        const prev = k - 1;
        want[prev] = 1;
        seekTo(prev, lastTime(prev));
        setFocusX(prev, 1);
        setFocus(prev);
        if (k < CLIP_COUNT) {
          const xf = clamp((pos - (seg.end - XFADE)) / XFADE);
          if (xf > 0) {
            want[k] = xf;
            seekTo(k, 0);
            setFocusX(k, 0);
          }
        }
      }
    }

    for (let i = 0; i < CLIP_COUNT; i++) {
      const a = want[i];
      if (alphas[i] === a) continue;
      alphas[i] = a;
      clips[i].el.style.opacity = String(a);
      clips[i].el.style.visibility = a > 0 ? "visible" : "hidden";
    }
  };

  const setStopState = (stop: HTMLElement, index: number, current: boolean) => {
    if (stopStates[index] === current) return;
    stopStates[index] = current;
    stop.classList.toggle("is-current", current);
  };

  // Nearest stop to the camera, for the rail: a clip belongs to the stop it is closer to.
  const nearestStop = () => {
    const seg = tl.segments.find((s) => pos < s.end) ?? tl.segments[tl.segments.length - 1];
    if (seg.kind === "hold") return seg.n;
    return pos - seg.start < (seg.end - seg.start) / 2 ? seg.n : seg.n + 1;
  };

  const updateOverlay = () => {
    stops.forEach((stop, i) => {
      const [from, to] = textWindow(tl, i);
      setStopState(stop, i, pos >= from && pos <= to);
    });

    const near = nearestStop();
    if (near !== railIndex) {
      railIndex = near;
      railLinks.forEach((a, i) => a.setAttribute("aria-current", i === near ? "true" : "false"));
    }

    // The side veil follows the text: dark behind it, clear of it while the camera moves.
    const active = stopStates.findIndex(Boolean);
    const textOn = active >= 0;
    if (textOn) {
      const nextSide = stops[active].dataset.side ?? "right";
      if (nextSide !== side) {
        side = nextSide;
        stage.dataset.side = nextSide;
      }
    }
    if (textOn !== hasText) {
      hasText = textOn;
      stage.toggleAttribute("data-text", textOn);
    }

    if (railFill) {
      const fill = Math.round((pos / tl.total) * 1000) / 1000;
      if (fill !== lastFill) {
        lastFill = fill;
        railFill.style.transform = `scaleY(${fill})`;
      }
    }

    if (hint) {
      const gone = pos > 0.05;
      if (gone !== hintGone) {
        hintGone = gone;
        hint.classList.toggle("is-gone", gone);
      }
    }

    // The bottom edge dissolves into the next section during the last stretch.
    const fade = clamp((pos - (tl.total - 0.35)) / 0.35);
    const maskStop = Math.round((100 - fade * 35) * 10) / 10;
    if (maskStop !== lastMaskStop) {
      lastMaskStop = maskStop;
      media.style.setProperty("--mask-stop", `${maskStop}%`);
    }
  };

  // Returns true while there is still motion left to animate.
  const tick = () => {
    const now = performance.now();
    const dt = lastT === null ? 1 / 60 : Math.min(0.05, (now - lastT) / 1000);
    lastT = now;

    const target = clamp((window.scrollY - trackTop) / unit, 0, tl.total);
    if (Math.abs(target - pos) > 3) pos = target; // anchor jumps: don't scrub through everything
    else {
      pos += (target - pos) * (1 - Math.exp(-FOLLOW * dt));
      if (Math.abs(target - pos) < 0.0005) pos = target;
    }

    render();
    updateOverlay();
    const moving = pos !== target;
    if (!moving) lastT = null;
    return moving;
  };

  const loop = createVisibleLoop(scrollTrack, tick);
  const resizeObserver = new ResizeObserver(measure);
  const onScroll = () => loop.wake();

  const onRailClick = (e: Event) => {
    const link = e.currentTarget as HTMLAnchorElement;
    const hold = tl.segments.find((sg) => sg.kind === "hold" && sg.n === Number(link.dataset.goto));
    if (!hold) return;
    // Lenis would also scroll to the anchor (the article's top); the camera should arrive in the stop's hold instead.
    e.preventDefault();
    e.stopPropagation();
    const y = trackTop + (hold.start + 0.15) * unit;
    if (window.smoothScroll) window.smoothScroll.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };
  railLinks.forEach((a) => a.addEventListener("click", onRailClick));

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", measure, { passive: true });
  resizeObserver.observe(document.body);

  // First frame: clip 1 comes in with a fade once its poster is on screen.
  const reveal = () => media.setAttribute("data-ready", "");
  const poster = new Image();
  poster.src = videos[0].getAttribute("poster") ?? "";
  poster.decode().then(reveal, reveal);
  const revealTimer = window.setTimeout(reveal, 1500);

  measure();
  tick();

  return () => {
    destroyed = true;
    window.clearTimeout(revealTimer);
    loop.destroy();
    resizeObserver.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", measure);
    window.removeEventListener("load", onLoad);
    window.removeEventListener("touchstart", prime);
    railLinks.forEach((a) => a.removeEventListener("click", onRailClick));
    listeners.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn));
  };
}
