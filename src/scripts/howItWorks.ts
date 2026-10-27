const SECTION_ID = "como-funciona";
// Time between stages; the fill transition in HowItWorksSection.astro matches it.
const STEP_MS = 320;
const START_DELAY_MS = 120;

export function initHowItWorks(): () => void {
  const section = document.getElementById(SECTION_ID);
  if (!section) return () => {};

  const stages = [...section.querySelectorAll<HTMLElement>(".hiw-stage")];
  const fill = section.querySelector<HTMLElement>(".hiw-fill");
  const chips = [...section.querySelectorAll<HTMLButtonElement>("[data-pick]")];
  const flow = section.querySelector(".hiw-flow");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let timers: number[] = [];
  let io: IntersectionObserver | null = null;

  // Stages before `upTo` are lit, `upTo` pulses, the rest wait.
  const light = (upTo: number) => {
    stages.forEach((s, i) => (s.dataset.lit = i < upTo ? "true" : i === upTo ? "pulse" : "false"));
    const progress = Math.min(1, Math.max(0, upTo) / (stages.length - 1));
    fill?.style.setProperty("--p", String(progress));
  };

  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };

  // Replays the command's path; a new pick interrupts the previous run.
  const play = () => {
    clearTimers();
    section.classList.remove("is-speaking");
    if (reduce.matches) {
      light(stages.length);
      return;
    }
    // The reset snaps; only the forward path animates.
    section.classList.add("is-resetting");
    light(-1);
    fill?.getBoundingClientRect();
    section.classList.remove("is-resetting");

    section.classList.add("is-speaking");
    stages.forEach((_, i) => timers.push(window.setTimeout(() => light(i), START_DELAY_MS + i * STEP_MS)));
    timers.push(window.setTimeout(() => section.classList.remove("is-speaking"), START_DELAY_MS + STEP_MS));
    timers.push(window.setTimeout(() => light(stages.length), START_DELAY_MS + stages.length * STEP_MS));
  };

  const handlePick = (event: Event) => {
    const chip = event.currentTarget as HTMLButtonElement;
    const cmd = chip.dataset.pick;
    if (!cmd || chip.getAttribute("aria-pressed") === "true") return;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    section.dataset.cmd = cmd;
    play();
  };

  chips.forEach((chip) => chip.addEventListener("click", handlePick));

  // First run when the flow scrolls into view
  if (flow && "IntersectionObserver" in window && !reduce.matches) {
    light(-1);
    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io?.disconnect();
        play();
      },
      // Fires once the flow reaches the lower third of the screen, whatever its height
      { rootMargin: "0px 0px -33% 0px" },
    );
    io.observe(flow);
  }

  return () => {
    clearTimers();
    io?.disconnect();
    chips.forEach((chip) => chip.removeEventListener("click", handlePick));
  };
}
