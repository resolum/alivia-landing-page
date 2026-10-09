import type { Lang } from '../i18n/ui';

export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface Plan {
  id: string;
  badge: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: PlanFeature[];
  ctaLabel: string;
  ctaHref: string;
  ctaNote: string;
  ariaLabel: string;
}

export const getPlans = (lang: Lang): Plan[] => [
  {
    id: 'esencial',
    badge: lang === 'es' ? 'Inicio Rápido' : 'Quick Start',
    name: lang === 'es' ? 'Esencial' : 'Essential',
    description:
      lang === 'es'
        ? 'Control por voz en la habitación principal para iluminación y emergencias.'
        : 'Voice control in the primary room for lighting and emergencies.',
    monthlyPrice: 99,
    annualPrice: 83,
    features: [
      {
        label: lang === 'es' ? 'Hub Alivia Core centralizado' : 'Centralized Alivia Hub Core',
        included: true,
      },
      {
        label:
          lang === 'es'
            ? 'Micrófono Far-Field alta sensibilidad'
            : 'High-sensitivity Far-Field microphone',
        included: true,
      },
      {
        label:
          lang === 'es'
            ? 'Módulos inteligentes de iluminación'
            : 'Smart lighting modules',
        included: true,
      },
      {
        label:
          lang === 'es'
            ? 'Sin actuador de puerta incluido'
            : 'No door actuator included',
        included: false,
      },
      {
        label:
          lang === 'es'
            ? 'App Alivia para el cuidador asignado'
            : 'Alivia App for assigned caregiver',
        included: true,
      },
    ],
    ctaLabel: lang === 'es' ? 'Continuar con este Plan' : 'Select this Plan',
    ctaHref: 'https://alivia-landing-page.vercel.app/',
    ctaNote:
      lang === 'es'
        ? 'Sin cobro de tarjeta en la landing'
        : 'No credit card charged on landing',
    ariaLabel:
      lang === 'es'
        ? 'Continuar con el Plan Esencial'
        : 'Select Essential Plan',
  },
  {
    id: 'personalizado',
    badge: lang === 'es' ? 'A tu medida' : 'Custom Tailored',
    name: lang === 'es' ? 'Personalizado' : 'Custom',
    description:
      lang === 'es'
        ? 'Configuración a demanda según número de ambientes y accesos especiales.'
        : 'On-demand configuration according to number of rooms and special access points.',
    monthlyPrice: null,
    annualPrice: null,
    features: [],
    ctaLabel: lang === 'es' ? 'Personalizar mi plan' : 'Customize my plan',
    ctaHref: 'https://alivia-landing-page.vercel.app/',
    ctaNote:
      lang === 'es'
        ? 'Redirige a la WebApp de cuidadores'
        : 'Redirects to Caregiver WebApp',
    ariaLabel: lang === 'es' ? 'Personalizar mi plan' : 'Customize my plan',
  },
];

export const PLANS = getPlans('es');

/** Room options for the "Personalizado" plan selector */
export const getRoomOptions = (lang: Lang): readonly string[] =>
  lang === 'es'
    ? [
        'Habitaciones (Dormitorio + Baño)',
        '1 Habitación principal',
        '2 Habitaciones',
        '3 Habitaciones',
        '4+ Habitaciones',
      ]
    : [
        'Rooms (Bedroom + Bathroom)',
        '1 Primary bedroom',
        '2 Rooms',
        '3 Rooms',
        '4+ Rooms',
      ];

export const ROOM_OPTIONS = getRoomOptions('es');

/** Door options for the "Personalizado" plan selector */
export const getDoorOptions = (lang: Lang): readonly string[] =>
  lang === 'es'
    ? [
        'Puerta principal',
        'Sin actuador de puerta',
        'Puerta principal + baño',
        '2 puertas',
        '3+ puertas',
      ]
    : [
        'Main door',
        'No door actuator',
        'Main door + bathroom',
        '2 doors',
        '3+ doors',
      ];

export const DOOR_OPTIONS = getDoorOptions('es');
