import { createFrameSequence, createVisibleLoop, pickFrameSize } from "./frameSequence";

const TOTAL_FRAMES = 240;
const FRAME_SIZES = [
  { dir: "sm", width: 960 },
  { dir: "lg", width: 1920 },
] as const;

export function initHeroAnimation(): () => void {
  const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
  const scrollTrack = document.getElementById("scroll-track");
  const stage = document.getElementById("hero-viewport");

  if (!canvas || !scrollTrack || !stage) return () => {};

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const cards = ["story-card-1", "story-card-2", "story-card-3", "story-card-4"].map((id) =>
    document.getElementById(id),
  );

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LERP = prefersReducedMotion ? 1 : 0.12;

  let targetFrame = 0;
  let currentFrame = 0;
  let lastRenderedFrame = -1;
  let drawnIndex = -1;
  let trackTop = 0;
  let trackScrollable = 0;
  let isMobile = window.innerWidth < 768;
  let lastMaskStop = -1;
  const cardStates: (boolean | undefined)[] = [];

  // Sizes come from the sticky stage's own box, never window.innerHeight: on phones
  // innerHeight changes every time the URL bar shows or hides, the stage doesn't.
  const stageW = () => stage.clientWidth || window.innerWidth;
  const stageH = () => stage.clientHeight || window.innerHeight;

  // Width (CSS px) the frame is drawn at to cover the stage.
  const coverWidth = (ratio: number) => Math.max(stageW(), stageH() * ratio);
  const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

  const sequence = createFrameSequence(pickFrameSize(FRAME_SIZES, coverWidth(16 / 9) * dpr()), {
    basePath: "/hero/",
    total: TOTAL_FRAMES,
    onFrame: (i) => {
      // Redraw only if the new frame is closer to what should be on screen.
      const want = Math.round(currentFrame);
      if (drawnIndex === -1 || Math.abs(i - want) < Math.abs(drawnIndex - want)) {
        lastRenderedFrame = -1;
        loop.wake();
      }
    },
  });

  const renderFrame = (frameIndex: number) => {
    const frame = sequence.get(frameIndex);
    if (!frame) return;
    const { img } = frame;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawW: number, drawH: number;
    if (canvasW / canvasH > imgRatio) {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
    } else {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
    }

    // Resizing the canvas resets this, so set it on every draw.
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (canvasW - drawW) / 2, (canvasH - drawH) / 2, drawW, drawH);
    drawnIndex = frame.index;
  };

  const measure = () => {
    const rect = scrollTrack.getBoundingClientRect();
    // The frame sequence starts once the "Alivia" intro has played.
    const intro = document.getElementById("intro-end")?.offsetTop ?? 0;
    trackTop = rect.top + window.scrollY + intro;
    // The stage stays pinned until the track's bottom meets the stage's bottom.
    trackScrollable = rect.height - stageH() - intro;
  };

  const resizeCanvas = () => {
    isMobile = window.innerWidth < 768;
    measure();
    // Never back the canvas with more pixels than the frame itself has.
    const scale = Math.min(dpr(), sequence.width / coverWidth(sequence.ratio));
    const w = Math.round(stageW() * scale);
    const h = Math.round(stageH() * scale);
    // Assigning width/height clears the bitmap, so only do it when the size really changed.
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    lastRenderedFrame = -1;
    loop.wake();
  };

  const getScrollProgress = () => {
    if (trackScrollable <= 0) return 0;
    return Math.max(0, Math.min(1, (window.scrollY - trackTop) / trackScrollable));
  };

  const setCardState = (card: HTMLElement | null, index: number, visible: boolean) => {
    if (!card || cardStates[index] === visible) return;
    cardStates[index] = visible;
    const hiddenY = isMobile ? "16px" : "20px";
    card.style.opacity = visible ? "1" : "0";
    card.style.transform = prefersReducedMotion ? "none" : `translateY(${visible ? "0px" : hiddenY})`;
    card.style.visibility = visible ? "visible" : "hidden";
    card.style.pointerEvents = visible ? "auto" : "none";
  };

  const updateOverlayCards = (progress: number) => {
    const maskFactor = progress > 0.88 ? Math.min(1, (progress - 0.88) / 0.12) : 0;
    const maskStop = Math.round((100 - maskFactor * 35) * 10) / 10;
    if (maskStop !== lastMaskStop) {
      lastMaskStop = maskStop;
      canvas.style.setProperty("--mask-stop", `${maskStop}%`);
    }

    setCardState(cards[0], 0, progress <= 0.22);
    setCardState(cards[1], 1, progress >= 0.25 && progress <= 0.48);
    setCardState(cards[2], 2, progress >= 0.52 && progress <= 0.75);
    setCardState(cards[3], 3, progress >= 0.78);
  };

  // Returns true while there is still motion left to animate.
  const tick = () => {
    const progress = getScrollProgress();
    targetFrame = progress * (TOTAL_FRAMES - 1);
    updateOverlayCards(progress);

    currentFrame += (targetFrame - currentFrame) * LERP;
    if (Math.abs(targetFrame - currentFrame) < 0.01) currentFrame = targetFrame;

    const frameToDraw = Math.round(currentFrame);
    if (frameToDraw !== lastRenderedFrame) {
      renderFrame(frameToDraw);
      lastRenderedFrame = frameToDraw;
    }
    return currentFrame !== targetFrame;
  };

  const loop = createVisibleLoop(scrollTrack, tick);
  const resizeObserver = new ResizeObserver(measure);

  window.addEventListener("scroll", loop.wake, { passive: true });
  window.addEventListener("resize", resizeCanvas, { passive: true });
  resizeObserver.observe(document.body);

  resizeCanvas();
  tick();

  // Cleanup handler for View Transitions / unmounting
  return () => {
    loop.destroy();
    sequence.destroy();
    resizeObserver.disconnect();
    window.removeEventListener("scroll", loop.wake);
    window.removeEventListener("resize", resizeCanvas);
  };
}
