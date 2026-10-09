import type { LegalDoc } from "./types";
import { legalConfig } from "./config";

export const termsDocEn: LegalDoc = {
  meta: {
    title: "Terms and Conditions of Use - Alivia",
    description: "Contractual terms and conditions of use for the Alivia platform and devices in Peru.",
    updated: legalConfig.terms.lastUpdated.en,
    version: legalConfig.terms.version,
    badge: "Service Agreement",
  },
  introCard: {
    badge: "Transparency and Clarity",
    title: "Accessibility and Assistive Service Commitment",
    text: "These Terms govern the use of the Alivia voice control system, home IoT modules, and caregiver application. Designed to provide autonomy with maximum technical security and user respect.",
  },
  sections: [
    {
      id: "aceptacion-terminos",
      number: 1,
      title: "Acceptance of Terms",
      subtitle: "Legal agreement and user consent",
      blocks: [
        {
          type: "paragraph",
          html: "By subscribing to, installing, or using any component of the Alivia ecosystem, the user and their authorized caregivers expressly agree to be bound by these Terms and Conditions.",
        },
      ],
    },
    {
      id: "descripcion-servicio",
      number: 2,
      title: "Service Description and Feasibility Assessment",
      subtitle: "Nature of the assistive solution",
      blocks: [
        {
          type: "paragraph",
          html: "Alivia provides a comprehensive voice-controlled home automation solution with 100% local processing, designed for individuals with mobility or motor coordination limitations.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Essential Requirement: Prior Technical Assessment",
          text: "Prior to final installation, a specialized technician will evaluate room electrical and acoustic infrastructure to ensure an optimal voice response rate.",
        },
      ],
    },
    {
      id: "registro-cuenta",
      number: 3,
      title: "Household Account Registration",
      subtitle: "Access management and care profiles",
      blocks: [
        {
          type: "paragraph",
          html: "The user or legal representative agrees to provide accurate data during account registration and emergency contact configuration.",
        },
      ],
    },
    {
      id: "planes-facturacion",
      number: 4,
      title: "Plans, Pricing, and Transparent Billing",
      subtitle: "Financial terms and procurement options",
      blocks: [
        {
          type: "paragraph",
          html: "Alivia offers subscription and equipment purchase options with transparent pricing, no hidden fees, and no unfair lock-ins.",
        },
        {
          type: "callout",
          variant: "success",
          title: "Temporary Payment Custody",
          text: "The payment for initial subscription or equipment is transparently held until technical installation in the home is verified and approved by the user.",
        },
        {
          type: "cards",
          items: [
            {
              icon: "credit-card",
              title: "Transparent Payments",
              text: "No hidden charges. Renewal fees are notified prior to processing.",
            },
            {
              icon: "shield-check",
              title: "No Mandatory Lock-In",
              text: "You can request subscription cancellation with 15 days notice prior to the next billing cycle.",
            },
          ],
        },
      ],
    },
    {
      id: "instalacion-garantias",
      number: 5,
      title: "Installation and Assistive Warranties",
      subtitle: "Comprehensive equipment protection and service level",
      blocks: [
        {
          type: "paragraph",
          html: "We offer clear warranties backed by our specialized technical team.",
        },
        {
          type: "cards",
          items: [
            {
              icon: "badge-check",
              title: "30-Day Satisfaction Guarantee",
              text: "If the system does not suit your voice assistance needs during the first 30 days, equipment cost will be refunded upon return in good condition.",
            },
            {
              icon: "cpu",
              title: "12-Month Hardware Warranty",
              text: "Full coverage for manufacturing defects on the local Hub, ambient microphones, and smart actuators.",
            },
          ],
        },
      ],
    },
    {
      id: "uso-aceptable",
      number: 6,
      title: "Acceptable Use of the Ecosystem",
      subtitle: "Responsible usage and physical safety guidelines",
      blocks: [
        {
          type: "paragraph",
          html: "The Alivia system must be used in accordance with the user manual. Unauthorized physical tampering with the local Hub or reverse engineering of voice algorithms is prohibited.",
        },
      ],
    },
    {
      id: "limitacion-responsabilidad",
      number: 7,
      title: "Limitation of Liability and Nature of Service",
      subtitle: "Non-medical assistive scope of the system",
      blocks: [
        {
          type: "paragraph",
          html: "Alivia is an assistive technology and adapted home automation tool, but does not replace professional emergency medical care or direct human supervision when required.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Crucial Assistive Notice",
          text: "Alivia is not a medical device or a health-regulated emergency life support system. In severe medical emergencies, contact public emergency services directly (106 / 116).",
        },
      ],
    },
    {
      id: "suspension-cancelacion",
      number: 8,
      title: "Service Suspension and Cancellation",
      subtitle: "Termination grounds and procedure",
      blocks: [
        {
          type: "paragraph",
          html: "The user may cancel the service at any time from the app or by contacting customer support. Alivia reserves the right to suspend access solely for material breach of these Terms or fraudulent use.",
        },
      ],
    },
    {
      id: "modificaciones-terminos",
      number: 9,
      title: "Modifications to Terms",
      subtitle: "Periodic updates to contractual conditions",
      blocks: [
        {
          type: "paragraph",
          html: "Material changes to contract terms will be notified through official channels 15 days in advance. TODO(translation-review)",
        },
      ],
    },
    {
      id: "ley-jurisdiccion",
      number: 10,
      title: "Applicable Law, Jurisdiction, and Contact",
      subtitle: "Peruvian legal framework and dispute resolution",
      blocks: [
        {
          type: "paragraph",
          html: "These Terms are governed by the laws of the Republic of Peru. Any dispute will be submitted to the jurisdiction of the courts of the Judicial District of Lima.",
        },
        {
          type: "contact",
        },
      ],
    },
  ],
};
