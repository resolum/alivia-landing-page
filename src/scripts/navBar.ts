const DEFAULT_TRIGGER_ID = "problema";

export function initNavBar(): () => void {
  const header = document.getElementById("main-header");
  if (!header) return () => {};

  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  const triggerId = header.getAttribute("data-solid-from") || DEFAULT_TRIGGER_ID;
  const triggerSection = document.getElementById(triggerId);

  let ticking = false;

  const updateSolidState = () => {
    if (!header) return;

    const isMenuOpen = mobileMenu ? !mobileMenu.classList.contains("hidden") : false;
    let isSectionReached = false;

    if (triggerSection) {
      const headerHeight = header.offsetHeight;
      const rect = triggerSection.getBoundingClientRect();
      isSectionReached = rect.top <= headerHeight;
    }

    const isSolid = isMenuOpen || isSectionReached;
    header.setAttribute("data-solid", isSolid ? "true" : "false");
  };

  const scheduleUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateSolidState();
        ticking = false;
      });
    }
  };

  const setMobileMenuState = (isOpen: boolean) => {
    if (!toggleBtn || !mobileMenu) return;
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.classList.toggle("hidden", !isOpen);
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", isOpen);
      iconClose.classList.toggle("hidden", !isOpen);
    }
    updateSolidState();
  };

  const handleToggleClick = () => {
    const isExpanded = toggleBtn?.getAttribute("aria-expanded") === "true";
    setMobileMenuState(!isExpanded);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuState(false);
  };

  if (toggleBtn) {
    toggleBtn.addEventListener("click", handleToggleClick);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", handleMobileLinkClick);
  });

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("pageshow", updateSolidState);
  window.addEventListener("hashchange", updateSolidState);
  window.addEventListener("popstate", updateSolidState);

  updateSolidState();

  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const activeLinksObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${id}`) {
            link.classList.add("text-alivia-secondary", "font-bold");
            link.classList.remove("text-alivia-primary-mist", "text-white/90");
          } else {
            link.classList.remove("text-alivia-secondary", "font-bold");
            link.classList.add("text-alivia-primary-mist");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => activeLinksObserver.observe(section));

  return () => {
    if (toggleBtn) toggleBtn.removeEventListener("click", handleToggleClick);
    mobileLinks.forEach((link) => link.removeEventListener("click", handleMobileLinkClick));
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    window.removeEventListener("pageshow", updateSolidState);
    window.removeEventListener("hashchange", updateSolidState);
    window.removeEventListener("popstate", updateSolidState);
    activeLinksObserver.disconnect();
  };
}
