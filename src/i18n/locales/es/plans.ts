import type { plans as plansEn } from "../en/plans";

export const plans = {
  "plans.badge": "Sin sorpresas ni letras pequeñas",
  "plans.title": "Planes Diseñados para Cada Necesidad",
  "plans.desc":
    "Instalación profesional certificada sin romper paredes, con retiro sin costo si tu ser querido no se adapta.",
  "plans.billingLabel": "Período de facturación",
  "plans.monthly": "Facturación Mensual",
  "plans.annual": "Pago Anual",
  "plans.save2months": "Ahorra 2 meses",
  "plans.perMonth": "/ mes",
  "plans.perMonthAnnual": "/ mes (cobro anual)",
  "plans.quotePrice": "A Cotizar",
  "plans.perEvaluation": "/ según evaluación",
  "plans.roomsLabel": "Habitaciones requeridas (1 mic por habitación):",
  "plans.doorsLabel": "Puertas con motorización requerida:",
} satisfies Record<keyof typeof plansEn, string>;
