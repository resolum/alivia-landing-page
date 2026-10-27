export function setupLegalInteractions() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("legal-print")?.addEventListener("click", () => window.print());

  // Mobile index: close after choosing a section so the clause is not hidden behind it
  const tocMobile = document.querySelector<HTMLDetailsElement>("details.toc-mobile");
  tocMobile?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      tocMobile.open = false;
    });
  });

  const handleHash = () => {
    const targetEl = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (!targetEl) return;
    targetEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  };

  window.addEventListener("hashchange", handleHash);
  if (window.location.hash) setTimeout(handleHash, 100);

  const sections = document.querySelectorAll<HTMLElement>(".legal-section");
  const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".toc-link");

  if (sections.length > 0 && tocLinks.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const href = `#${entry.target.id}`;
          // Colour and tone only: a weight change would reflow the index
          tocLinks.forEach((link) => {
            if (link.getAttribute("href") === href) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((sec) => observer.observe(sec));
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupLegalInteractions);
} else {
  setupLegalInteractions();
}
