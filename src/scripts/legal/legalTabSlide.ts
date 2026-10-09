export function setupLegalTabSlide() {
  const nav = document.querySelector<HTMLElement>(".legal-tab-nav");
  if (!nav) return;

  const pill = nav.querySelector<HTMLElement>(".legal-tab-pill");
  const links = nav.querySelectorAll<HTMLAnchorElement>("a[data-tab]");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetTab = link.getAttribute("data-tab");
      const activeTab = nav.getAttribute("data-active-tab");

      if (targetTab && activeTab && targetTab !== activeTab && pill) {
        e.preventDefault();
        const targetHref = link.href;

        if (targetTab === "terms") {
          pill.style.left = "calc(50% + 2px)";
        } else {
          pill.style.left = "4px";
        }

        setTimeout(() => {
          window.location.href = targetHref;
        }, 220);
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupLegalTabSlide);
} else {
  setupLegalTabSlide();
}
