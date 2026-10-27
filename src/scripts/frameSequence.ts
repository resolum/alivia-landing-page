export interface FrameSize {
  dir: string;
  width: number;
}

export interface FrameSequenceOptions {
  basePath: string;
  total: number;
  prefix?: string;
  ext?: string;
  concurrency?: number;
  onFrame?: (index: number) => void;
  onComplete?: () => void;
}

export interface FrameSequence {
  /** Frame width (px) of the active set. */
  readonly width: number;
  /** Width / height of the frames, known once the first frame decodes. */
  readonly ratio: number;
  readonly complete: boolean;
  /** Closest decoded frame to `index`, or null if none is ready yet. */
  get(index: number): { img: HTMLImageElement; index: number } | null;
  destroy(): void;
}

const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

export function pickFrameSize(sizes: readonly FrameSize[], requiredWidth: number): FrameSize {
  if (connection?.saveData) return sizes[0];
  return sizes.find((s) => s.width >= requiredWidth) ?? sizes[sizes.length - 1];
}

/** Coarse-to-fine load order: 0, last, then halving strides. */
function loadOrder(total: number): number[] {
  const seen = new Set<number>([0, total - 1]);
  const order = [0, total - 1];
  for (let stride = 32; stride >= 1; stride >>= 1) {
    for (let i = 0; i < total; i += stride) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

export function createFrameSequence(size: FrameSize, opts: FrameSequenceOptions): FrameSequence {
  const { basePath, total, prefix = "ezgif-frame-", ext = ".webp", concurrency = 6, onFrame, onComplete } = opts;

  const frames: (HTMLImageElement | null)[] = new Array(total).fill(null);
  const pending = new Set<HTMLImageElement>();
  const queue = loadOrder(total);
  let settled = 0;
  let ratio = 16 / 9;
  let destroyed = false;

  const url = (i: number) => `${basePath}${size.dir}/${prefix}${String(i + 1).padStart(3, "0")}${ext}`;

  const finish = (img: HTMLImageElement) => {
    pending.delete(img);
    settled++;
    if (settled === total) onComplete?.();
    next();
  };

  const next = () => {
    while (!destroyed && pending.size < concurrency && queue.length) {
      const i = queue.shift()!;
      const img = new Image();
      img.decoding = "async";
      if (i === 0) img.fetchPriority = "high";
      pending.add(img);
      img.src = url(i);
      img
        .decode()
        .then(() => {
          if (destroyed) return;
          if (i === 0) ratio = img.naturalWidth / img.naturalHeight;
          frames[i] = img;
          onFrame?.(i);
        })
        .catch(() => {})
        .finally(() => finish(img));
    }
  };

  next();

  return {
    width: size.width,
    get ratio() {
      return ratio;
    },
    get complete() {
      return settled === total;
    },
    get(index) {
      const i = Math.max(0, Math.min(total - 1, index));
      for (let d = 0; d < total; d++) {
        const lo = frames[i - d];
        if (lo) return { img: lo, index: i - d };
        const hi = frames[i + d];
        if (hi) return { img: hi, index: i + d };
      }
      return null;
    },
    destroy() {
      destroyed = true;
      queue.length = 0;
      pending.forEach((img) => (img.src = ""));
      pending.clear();
    },
  };
}

/**
 * Runs `tick` on requestAnimationFrame only while `element` is near the
 * viewport and `tick` reports there is still motion left. Call `wake()`
 * from scroll/resize to restart it.
 */
export function createVisibleLoop(element: Element, tick: () => boolean) {
  let rafId: number | null = null;
  let visible = false;

  const frame = () => {
    rafId = null;
    if (tick() && visible) rafId = requestAnimationFrame(frame);
  };

  const wake = () => {
    if (visible && rafId === null) rafId = requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    },
    { rootMargin: "100px 0px" },
  );
  io.observe(element);

  return {
    wake,
    destroy() {
      io.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    },
  };
}
