// Scroll timeline of the hero: 7 stops joined by 6 clips. Units are viewport heights (svh)
// of scroll, shared by the CSS track height (HeroAnimation.astro) and the scrub (heroAnimation.ts).

export const CLIP_COUNT = 6;
export const XFADE = 0.1; // crossfade length at a seam, in svh; it sits at the tail of the stop's hold

// Scroll spent standing still at each stop, long enough to read that stop's text.
const HOLDS = [1.0, 0.8, 0.9, 0.8, 0.9, 0.9, 1.0];

export interface Segment {
  kind: "hold" | "clip";
  n: number; // stop index for a hold, clip index for a clip
  start: number;
  end: number;
}

export interface Timeline {
  segments: Segment[];
  total: number;
}

export function buildTimeline(mobile: boolean): Timeline {
  const clip = mobile ? 0.9 : 1.2;
  const lengths = [clip, clip, clip, clip, clip, mobile ? 0.7 : 1.0]; // clip 6 is only 4 s long
  const segments: Segment[] = [];
  let at = 0;
  const push = (kind: Segment["kind"], n: number, len: number) => {
    segments.push({ kind, n, start: at, end: at + len });
    at += len;
  };
  for (let stop = 0; stop <= CLIP_COUNT; stop++) {
    push("hold", stop, HOLDS[stop]);
    if (stop < CLIP_COUNT) push("clip", stop, lengths[stop]);
  }
  return { segments, total: at };
}

/** Scroll range in which the text of `stop` shows: camera still, clear of the seam crossfade. */
export function textWindow(tl: Timeline, stop: number): [number, number] {
  const hold = tl.segments.find((s) => s.kind === "hold" && s.n === stop)!;
  const from = hold.start; // the camera is already still: it arrives at the end of the previous clip
  const tail = stop === CLIP_COUNT ? 0 : XFADE + 0.1;
  return [from, hold.end - tail];
}

/**
 * Height of each stop's <article> in svh: its hold plus the clip that follows. The last one also
 * covers the pinned stage's own height, so the scrub can reach the final frame.
 */
export function stopLengths(mobile: boolean): number[] {
  const { segments } = buildTimeline(mobile);
  const len = (kind: Segment["kind"], n: number) => {
    const s = segments.find((x) => x.kind === kind && x.n === n);
    return s ? s.end - s.start : 0;
  };
  return Array.from({ length: CLIP_COUNT + 1 }, (_, k) => len("hold", k) + len("clip", k) + (k === CLIP_COUNT ? 1 : 0));
}

export const DESKTOP_SCRUB = buildTimeline(false).total;
export const MOBILE_SCRUB = buildTimeline(true).total;
