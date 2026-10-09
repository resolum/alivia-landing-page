import type { nav as navEn } from "../en/nav";

export const nav = {
  "nav.logoAriaLabel": "Alivia – Inicio",
  "nav.a11yBadge": "Accesibilidad",
  "nav.a11yBadgeMobile": "Sello Accesibilidad WCAG 2.1 AA",
  "nav.mainNavLabel": "Navegación principal",
  "nav.login": "Iniciar sesión",
  "nav.loginAriaLabel": "Iniciar sesión en la aplicación web de Alivia",
  "nav.mobileMenuToggle": "Abrir menú de navegación",
  "nav.mobileMenuLabel": "Menú móvil",
} satisfies Record<keyof typeof navEn, string>;
