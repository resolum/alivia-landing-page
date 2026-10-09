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

export const PLANS: Plan[] = [
  {
    id: 'esencial',
    badge: 'Inicio Rápido',
    name: 'Esencial',
    description:
      'Control por voz en la habitación principal para iluminación y emergencias.',
    monthlyPrice: 99,
    annualPrice: 83,
    features: [
      { label: 'Hub Alivia Core centralizado', included: true },
      { label: 'Micrófono Far-Field alta sensibilidad', included: true },
      { label: 'Módulos inteligentes de iluminación', included: true },
      { label: 'Sin actuador de puerta incluido', included: false },
      { label: 'App Alivia para el cuidador asignado', included: true },
    ],
    ctaLabel: 'Continuar con este Plan',
    ctaHref: 'https://app.alivia.care/onboarding',
    ctaNote: 'Sin cobro de tarjeta en la landing',
    ariaLabel: 'Continuar con el Plan Esencial',
  },
  {
    id: 'personalizado',
    badge: 'A tu medida',
    name: 'Personalizado',
    description:
      'Configuración a demanda según número de ambientes y accesos especiales.',
    monthlyPrice: null,
    annualPrice: null,
    features: [],
    ctaLabel: 'Personalizar mi plan',
    ctaHref: 'https://app.alivia.care/onboarding',
    ctaNote: 'Redirige a la WebApp de cuidadores',
    ariaLabel: 'Personalizar mi plan',
  },
];

/** Room options for the "Personalizado" plan selector */
export const ROOM_OPTIONS = [
  'Habitaciones (Dormitorio + Baño)',
  '1 Habitación principal',
  '2 Habitaciones',
  '3 Habitaciones',
  '4+ Habitaciones',
] as const;

/** Door options for the "Personalizado" plan selector */
export const DOOR_OPTIONS = [
  'Puerta principal',
  'Sin actuador de puerta',
  'Puerta principal + baño',
  '2 puertas',
  '3+ puertas',
] as const;
