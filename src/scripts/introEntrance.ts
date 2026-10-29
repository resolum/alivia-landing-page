// Load entrance for the "Alivia" intro: the letters cut through the navy panel
// one by one while the word settles, then the scroll hint arrives.
// Runs once, before the scroll-driven dive in introWord.ts takes over.
// <html data-intro-entered> lifts the CSS hidden state in HeroAnimation.astro.

import { animate, stagger } from "motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const; // --ease-out

export function initIntroEntrance(): () => void {
  const root = document.documentElement;
  const intro = document.getElementById("alivia-intro");
  const word = intro?.querySelector<SVGTextElement>("[data-intro-word]");
  const letters = intro?.querySelectorAll<SVGTSpanElement>("[data-intro-letter]");
  const hint = intro?.querySelector<HTMLElement>("[data-hint]");

  const finish = () => {
    root.dataset.introEntered = "";
  };

  // Nothing to stage: intro already passed, reduced motion, or markup missing.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const played = root.dataset.introEntered !== undefined;
  if (played || !intro || !word || !letters?.length || root.dataset.intro !== "pending" || window.scrollY > 0 || reduce) {
    finish();
    return () => {};
  }

  const controls = [
    animate(letters, { fillOpacity: [0, 1] }, { duration: 0.5, delay: stagger(0.06, { startDelay: 0.1 }), ease: EASE_OUT }),
    animate(word, { y: [28, 0], scale: [0.96, 1] }, { duration: 0.8, ease: EASE_OUT }),
  ];
  if (hint) {
    // Opacity only: the arrow's nudge keyframes own its transform.
    controls.push(animate(hint.children, { opacity: [0, 1] }, { duration: 0.4, delay: 0.55, ease: EASE_OUT }));
  }
  Promise.all(controls.map((c) => c.finished)).then(finish, finish);

  // The visitor is already moving: jump to the end so the dive starts from the full word.
  const skip = () => {
    for (const c of controls) c.complete();
    detach();
  };
  const events = ["wheel", "touchstart", "keydown", "scroll"] as const;
  const detach = () => events.forEach((e) => window.removeEventListener(e, skip));
  events.forEach((e) => window.addEventListener(e, skip, { passive: true, once: true }));

  return () => {
    detach();
    skip();
  };
}
