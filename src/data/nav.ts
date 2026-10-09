import type { Lang } from '../i18n/ui';

export interface NavLink {
  href: string;
  label: string;
}

export const getNavLinks = (lang: Lang): NavLink[] => [
  { href: '#que-es',        label: lang === 'es' ? '¿Qué es?' : 'What is Alivia?' },
  { href: '#como-funciona', label: lang === 'es' ? 'Cómo funciona' : 'How it works' },
  { href: '#dispositivos',  label: lang === 'es' ? 'Dispositivos' : 'Devices' },
  { href: '#audiovisual',   label: lang === 'es' ? 'Audiovisual' : 'Media' },
  { href: '#testimonios',   label: lang === 'es' ? 'Testimonios' : 'Testimonials' },
  { href: '#equipo',        label: lang === 'es' ? 'Equipo' : 'Team' },
  { href: '#planes',        label: lang === 'es' ? 'Planes' : 'Plans' },
  { href: '#faq',           label: lang === 'es' ? 'FAQ' : 'FAQ' },
];

/** Backward compatibility default export in Spanish */
export const NAV_LINKS = getNavLinks('es');
