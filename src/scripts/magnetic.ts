// Magnetic CTAs: [data-magnetic] buttons lean toward the cursor and spring
// back when it leaves. Mouse only; touch and reduced motion keep them still.
// Uses the `translate` property so it composes with .press's scale on :active.

import { springValue } from "motion";

const STRENGTH = 0.25; // share of the cursor's offset from centre the button follows
const MAX = 8; // px
const SPRING = { stiffness: 260, damping: 22, mass: 0.6 };

const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

export function initMagnetic(): () => void {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const cleanups: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const x = springValue(0 as number, SPRING);
    const y = springValue(0 as number, SPRING);
    const apply = () => {
      el.style.translate = `${x.get()}px ${y.get()}px`;
    };
    const offX = x.on("change", apply);
    const offY = y.on("change", apply);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(clamp((e.clientX - (r.left + r.width / 2)) * STRENGTH));
      y.set(clamp((e.clientY - (r.top + r.height / 2)) * STRENGTH));
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      offX();
      offY();
      x.destroy();
      y.destroy();
      el.style.translate = "";
    });
  });
  return () => cleanups.forEach((c) => c());
}
