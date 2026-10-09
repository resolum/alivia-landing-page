import type { LegalDoc } from "./types";
import { legalConfig } from "./config";

export const privacyDocEn: LegalDoc = {
  meta: {
    title: "Privacy Policy - Alivia",
    description: "Privacy policy and personal data protection for the Alivia platform in Peru.",
    updated: legalConfig.privacy.lastUpdated.en,
    version: legalConfig.privacy.version,
    badge: "Law N° 29733",
  },
  introCard: {
    badge: "Guaranteed Privacy",
    title: "Privacy by Design and Local Architecture",
    text: "At Alivia, we protect the privacy of individuals with severe motor disabilities and their families. Our system processes voice instructions locally on your home network, without transmitting audio recordings to external cloud servers or selling your data.",
  },
  sections: [
    {
      id: "info-recopilada",
      number: 1,
      title: "Information We Collect",
      subtitle: "Categories of data processed in the Alivia platform",
      blocks: [
        {
          type: "paragraph",
          html: "To provide a secure and personalized assistive service, we collect and process only the minimal data essential for the operation of the Alivia ecosystem.",
        },
        {
          type: "cards",
          items: [
            {
              icon: "user",
              title: "Assisted Person and Caregiver",
              text: "Full names, emergency contact details, care relationship, and application preference settings.",
            },
            {
              icon: "device",
              title: "Device Telemetry",
              text: "Operational status of modules (battery, Zigbee/LAN connectivity, actuator state) logged on the local Hub.",
            },
            {
              icon: "microphone",
              title: "Voice Interaction Metadata",
              text: "Logs of command execution in plain text processed locally. Audio is never stored in the cloud.",
            },
          ],
        },
        {
          type: "callout",
          variant: "success",
          title: "Technological Commitment: Your Voice Never Travels to the Cloud",
          text: "Natural language recognition is performed entirely within the Alivia Hub inside your home. Transmissions to the caregiver app contain only event states and alerts without audio.",
        },
      ],
    },
    {
      id: "uso-informacion",
      number: 2,
      title: "How We Use Your Information",
      subtitle: "Exclusive purposes for data processing",
      blocks: [
        {
          type: "paragraph",
          html: "Collected personal data is strictly intended for the following assistive and operational purposes:",
        },
        {
          type: "list",
          items: [
            "Execution of home automation commands (lights, doors, assistance calls).",
            "Sending immediate notifications to the family network during emergency situations.",
            "Preventive diagnostics and remote technical support regarding module status.",
            "Compliance with applicable legal obligations under personal data protection laws.",
          ],
        },
      ],
    },
    {
      id: "compartir-informacion",
      number: 3,
      title: "Whom We Share Your Information With",
      subtitle: "Non-sale policy and strict confidentiality",
      blocks: [
        {
          type: "paragraph",
          html: "<strong>We do not sell, rent, or commercialize</strong> your personal data to third parties under any circumstances. We only share information in the following limited cases:",
        },
        {
          type: "list",
          items: [
            "With authorized caregivers previously designated by the primary user.",
            "With technical infrastructure providers (alert storage) under strict confidentiality agreements.",
            "When required by judicial order or competent authority under Law N° 29733.",
          ],
        },
      ],
    },
    {
      id: "proteccion-informacion",
      number: 4,
      title: "How We Protect Your Information",
      subtitle: "Technical, organizational, and physical security measures",
      blocks: [
        {
          type: "paragraph",
          html: "We implement high cybersecurity standards, including data encryption in transit (TLS 1.3) and at rest (AES-256), LAN network isolation for local commands, and periodic security audits.",
        },
      ],
    },
    {
      id: "derechos-arco",
      number: 5,
      title: "Your Rights (ARCO)",
      subtitle: "Access, Rectification, Cancellation, and Opposition",
      blocks: [
        {
          type: "paragraph",
          html: "In accordance with Law N° 29733 and its Regulations, you have the right to exercise your Rights of Access, Rectification, Cancellation, and Opposition at any time.",
        },
        {
          type: "list",
          items: [
            "<strong>Access:</strong> Request details of personal data stored in our data banks.",
            "<strong>Rectification:</strong> Update or correct inaccurate or incomplete information.",
            "<strong>Cancellation:</strong> Request deletion of your data when no longer necessary.",
            "<strong>Opposition:</strong> Object to processing of your data for specific purposes.",
          ],
        },
      ],
    },
    {
      id: "retencion-eliminacion",
      number: 6,
      title: "Retention and Deletion",
      subtitle: "Data retention timelines in the system",
      blocks: [
        {
          type: "paragraph",
          html: "We retain personal data only for the duration of the service relationship. Upon account cancellation, data is deleted or irreversibly anonymized within 30 days. TODO(translation-review)",
        },
      ],
    },
    {
      id: "cambios-politica",
      number: 7,
      title: "Changes to This Policy",
      subtitle: "Update notification procedure",
      blocks: [
        {
          type: "paragraph",
          html: "We will notify you of any material changes to this Privacy Policy through the Alivia application and via email at least 15 days in advance of their entry into force.",
        },
      ],
    },
    {
      id: "canal-contacto",
      number: 8,
      title: "Official Channel and Contact",
      subtitle: "Direct assistance for privacy inquiries and ARCO rights exercise",
      blocks: [
        {
          type: "contact",
        },
      ],
    },
  ],
};
