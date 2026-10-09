export interface NavLink {
    href: string;
    label: string;
}

export const NAV_LINKS: NavLink[] = [
    { href: '#que-es',        label: '¿Qué es?' },
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#dispositivos',  label: 'Dispositivos' },
    { href: '#audiovisual',   label: 'Audiovisual' },
    { href: '#testimonios',   label: 'Testimonios' },
    { href: '#equipo',        label: 'Equipo' },
    { href: '#planes',        label: 'Planes' },
    { href: '#faq',           label: 'FAQ' },
];
