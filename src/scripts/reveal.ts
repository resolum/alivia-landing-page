// Section entrances: each [data-reveal] plays once as it scrolls into view,
// rising out of a soft blur. Siblings inside a [data-reveal-group] stagger.
// A block that leads with an <h2> is choreographed: the heading's words rise
// out of a mask, then the rest of the block follows.
// Content stays visible if this never runs (no JS, reduced motion): the hidden
// state in global.css only applies under html.reveal-ready.
//
// Transforms are full strings, not Motion's x/y shorthands, so the animations
// stay on the compositor while the page is busy scrolling and decoding images.

import { animate, inView, scroll, stagger, type DOMKeyframesDefinition } from "motion";

const EASE_FLUID = [0.22, 1, 0.36, 1] as const;
const STAGGER = 0.08;
const WORD_STAGGER = 0.035;
const MAX_STAGGER_STEPS = 6;

// End frames are explicit identity transforms, never "none": Motion resolves
// "none" against the start string, so "scale(0.95)" → "none" lands on scale(0).

// Blur only on text-sized blocks: on large panels it costs more than it adds.
const BLUR = ["blur(8px)", "blur(0px)"];

const VARIANTS: Record<string, { keyframes: DOMKeyframesDefinition; duration: number }> = {
  default: { keyframes: { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0px)"], filter: BLUR }, duration: 0.9 },
  left: { keyframes: { opacity: [0, 1], transform: ["translateX(-32px)", "translateX(0px)"], filter: BLUR }, duration: 0.9 },
  right: { keyframes: { opacity: [0, 1], transform: ["translateX(32px)", "translateX(0px)"], filter: BLUR }, duration: 0.9 },
  col: { keyframes: { opacity: [0, 1], transform: ["translateY(48px)", "translateY(0px)"], filter: BLUR }, duration: 0.9 },
  scale: { keyframes: { opacity: [0, 1], transform: ["translateY(32px) scale(0.95)", "translateY(0px) scale(1)"] }, duration: 1 },
  rise: { keyframes: { opacity: [0, 1], transform: ["translateY(96px)", "translateY(0px)"] }, duration: 1.1 },
  media: { keyframes: { opacity: [0, 1] }, duration: 0.8 },
  fade: { keyframes: { opacity: [0, 1] }, duration: 0.8 },
};

// Stagger only among siblings that enter together. Counting from the start of
// the group would leave a card that scrolls in on its own blank for its full
// index delay, which reads as the card having vanished.
let batch: HTMLElement[] = [];

function flushBatch() {
  const entering = batch;
  batch = [];
  const counts = new Map<Element, number>();
  entering.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  for (const el of entering) {
    const group = el.parentElement?.hasAttribute("data-reveal-group") ? el.parentElement : null;
    const i = group ? (counts.get(group) ?? 0) : 0;
    if (group) counts.set(group, i + 1);
    reveal(el, Math.min(i, MAX_STAGGER_STEPS) * STAGGER);
  }
}

function queueReveal(el: HTMLElement) {
  if (!batch.length) queueMicrotask(flushBatch);
  batch.push(el);
}

// Wraps each word of a plain-text heading in a clipping mask. Headings with
// markup inside are left alone rather than risk breaking it.
function splitWords(heading: HTMLElement): HTMLElement[] | null {
  if (heading.children.length || !heading.textContent?.trim()) return null;
  const words = heading.textContent.trim().split(/\s+/);
  heading.textContent = "";
  const inner: HTMLElement[] = [];
  words.forEach((word, i) => {
    if (i > 0) heading.append(" ");
    const mask = document.createElement("span");
    mask.className = "split-mask";
    const span = document.createElement("span");
    span.className = "split-word";
    span.textContent = word;
    mask.append(span);
    heading.append(mask);
    inner.push(span);
  });
  return inner;
}

function revealHeadingBlock(el: HTMLElement, heading: HTMLElement, words: HTMLElement[], delay: number) {
  // Park everything at its start frame first so nothing flashes during the stagger delays.
  for (const w of words) w.style.transform = "translateY(110%)";
  animate(el, { opacity: [0, 1] }, { duration: 0.3, delay });
  animate(
    words,
    { transform: ["translateY(110%)", "translateY(0px)"] },
    { duration: 0.9, delay: stagger(WORD_STAGGER, { startDelay: delay }), ease: EASE_FLUID },
  );

  // Everything around the heading (eyebrow, copy, CTAs) follows once the title is mostly in.
  if (heading === el) return;
  const rest = [...el.children].filter((c): c is HTMLElement => c !== heading && c instanceof HTMLElement);
  const after = delay + 0.1 + Math.min(words.length, 6) * WORD_STAGGER;
  rest.forEach((child, i) => {
    child.style.opacity = "0";
    const before = child.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING;
    animate(
      child,
      { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0px)"], filter: BLUR },
      { duration: 0.8, delay: before ? delay : after + i * STAGGER, ease: EASE_FLUID },
    ).finished.then(() => (child.style.filter = ""));
  });
}

function reveal(el: HTMLElement, delay: number) {
  const kind = el.dataset.reveal || "default";

  const heading = kind !== "default" ? null : el.tagName === "H2" ? el : el.querySelector<HTMLElement>(":scope > h2");
  const words = heading && splitWords(heading);
  if (heading && words) {
    revealHeadingBlock(el, heading, words, delay);
    return;
  }

  const variant = VARIANTS[kind] ?? VARIANTS.default;
  const options = { duration: variant.duration, delay, ease: EASE_FLUID };

  animate(el, variant.keyframes, options).finished.then(() => {
    // Drop the finished filter so the element doesn't keep its own layer.
    el.style.filter = "";
  });

  if (kind === "media") {
    // The photo settles inside its own crop while the frame fades in.
    const img = el.querySelector("img");
    if (img) animate(img, { transform: ["scale(1.12)", "scale(1)"] }, { ...options, duration: 1.4 });
  }
}

export function initReveal(): () => void {
  const root = document.documentElement;
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!items.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  root.classList.add("reveal-ready");
  return inView(
    items,
    (el) => {
      queueReveal(el as HTMLElement);
    },
    // Fire just before the element is fully on screen, so nothing sits blank in view.
    { margin: "0px 0px -4% 0px" },
  );
}

// Scroll-lit statement: words brighten one by one as the block moves up the screen.
export function initWordLight(): () => void {
  const stops: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>("[data-words]").forEach((block) => {
    const words = block.querySelectorAll<HTMLElement>("[data-word]");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.classList.add("is-lit"));
      return;
    }
    block.classList.add("words-ready");

    let lit = -1;
    stops.push(
      scroll(
        (progress: number) => {
          const n = Math.round(progress * words.length);
          if (n === lit) return;
          lit = n;
          for (let i = 0; i < words.length; i++) words[i].classList.toggle("is-lit", i < n);
        },
        // Starts as the top passes 85% of the viewport, done when the bottom reaches 45%.
        { target: block, offset: ["start 0.85", "end 0.45"] },
      ),
    );
  });
  return () => stops.forEach((s) => s());
}
