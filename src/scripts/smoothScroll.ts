// Inertial wheel scrolling, driven from Motion's frame loop so scroll and
// animation read the same clock. Touch keeps the native, OS-tuned scroll.
// Everything else on the page still reads window.scrollY as usual.

import Lenis from "lenis";
import { cancelFrame, frame } from "motion";

declare global {
  interface Window {
    smoothScroll?: Lenis;
  }
}

export function initSmoothScroll(): () => void {
  if (window.smoothScroll || matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const lenis = new Lenis({ autoRaf: false, anchors: true });
  const raf = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
  frame.update(raf, true);
  window.smoothScroll = lenis;

  return () => {
    cancelFrame(raf);
    lenis.destroy();
    window.smoothScroll = undefined;
  };
}
