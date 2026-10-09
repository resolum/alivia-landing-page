export function setupLegalInteractions() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const btnExpand = document.getElementById("btn-expand-all");
  const btnCollapse = document.getElementById("btn-collapse-all");
  const accordions = document.querySelectorAll<HTMLDetailsElement>("details.legal-accordion-details");

  accordions.forEach((details) => {
    const summary = details.querySelector<HTMLElement>("summary");
    const content = details.querySelector<HTMLElement>(".accordion-content-container");
    const chevron = details.querySelector<SVGElement>(".accordion-chevron");

    if (!summary || !content) return;

    let isAnimating = false;

    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (isAnimating) return;

      const isOpen = details.hasAttribute("open");

      if (prefersReducedMotion) {
        if (isOpen) {
          details.removeAttribute("open");
          if (chevron) chevron.style.transform = "rotate(0deg)";
        } else {
          details.setAttribute("open", "");
          if (chevron) chevron.style.transform = "rotate(180deg)";
        }
        return;
      }

      isAnimating = true;

      if (!isOpen) {
        details.setAttribute("open", "");
        const endHeight = content.scrollHeight;

        content.style.height = "0px";
        content.style.opacity = "0";
        if (chevron) chevron.style.transform = "rotate(180deg)";

        requestAnimationFrame(() => {
          content.style.transition = "height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease";
          content.style.height = `${endHeight}px`;
          content.style.opacity = "1";
        });

        setTimeout(() => {
          content.style.height = "auto";
          content.style.transition = "";
          isAnimating = false;
        }, 360);
      } else {
        const startHeight = content.offsetHeight;

        content.style.height = `${startHeight}px`;
        content.style.opacity = "1";
        if (chevron) chevron.style.transform = "rotate(0deg)";

        requestAnimationFrame(() => {
          content.style.transition = "height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease";
          content.style.height = "0px";
          content.style.opacity = "0";
        });

        setTimeout(() => {
          details.removeAttribute("open");
          content.style.height = "";
          content.style.opacity = "";
          content.style.transition = "";
          isAnimating = false;
        }, 310);
      }
    });
  });

  btnExpand?.addEventListener("click", () => {
    accordions.forEach((acc) => {
      acc.open = true;
      const content = acc.querySelector<HTMLElement>(".accordion-content-container");
      const chevron = acc.querySelector<SVGElement>(".accordion-chevron");
      if (content) {
        content.style.height = "auto";
        content.style.opacity = "1";
      }
      if (chevron) chevron.style.transform = "rotate(180deg)";
    });
  });

  btnCollapse?.addEventListener("click", () => {
    accordions.forEach((acc) => {
      acc.open = false;
      const content = acc.querySelector<HTMLElement>(".accordion-content-container");
      const chevron = acc.querySelector<SVGElement>(".accordion-chevron");
      if (content) {
        content.style.height = "";
        content.style.opacity = "";
      }
      if (chevron) chevron.style.transform = "rotate(0deg)";
    });
  });

  const handleHash = () => {
    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const detailsParent = targetEl.closest("details") || (targetEl.tagName === "DETAILS" ? (targetEl as HTMLDetailsElement) : null);
    if (detailsParent) {
      detailsParent.open = true;
      const content = detailsParent.querySelector<HTMLElement>(".accordion-content-container");
      const chevron = detailsParent.querySelector<SVGElement>(".accordion-chevron");
      if (content) {
        content.style.height = "auto";
        content.style.opacity = "1";
      }
      if (chevron) chevron.style.transform = "rotate(180deg)";
    }

    targetEl.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  window.addEventListener("hashchange", handleHash);
  if (window.location.hash) {
    setTimeout(handleHash, 100);
  }

  const sections = document.querySelectorAll<HTMLElement>(".legal-section");
  const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".toc-link");

  if (sections.length > 0 && tocLinks.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach((link) => {
              const href = link.getAttribute("href");
              if (href === `#${id}`) {
                link.classList.add("bg-alivia-surface", "font-bold", "text-alivia-primary");
                link.classList.remove("text-alivia-neutral-dark");
              } else {
                link.classList.remove("bg-alivia-surface", "font-bold", "text-alivia-primary");
                link.classList.add("text-alivia-neutral-dark");
              }
            });
          }
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  window.addEventListener("beforeprint", () => {
    accordions.forEach((acc) => (acc.open = true));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupLegalInteractions);
} else {
  setupLegalInteractions();
}
