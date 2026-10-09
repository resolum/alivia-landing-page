import type { LegalDoc } from "./types";
import { legalConfig } from "./config";

export const privacyDocEs: LegalDoc = {
  meta: {
    title: "Política de Privacidad - Alivia",
    description: "Política de privacidad y protección de datos personales del sistema Alivia en el Perú.",
    updated: legalConfig.privacy.lastUpdated.es,
    version: legalConfig.privacy.version,
    badge: "Ley N° 29733",
  },
  introCard: {
    badge: "Privacidad Garantizada",
    title: "Privacidad por diseño y arquitectura local",
    text: "En Alivia protegemos la intimidad de las personas con discapacidad motora severa y sus familias. Nuestro sistema procesa las instrucciones de voz localmente en la red del hogar, sin transmitir grabaciones de audio hacia servidores externos ni comercializar tus datos.",
  },
  sections: [
    {
      id: "info-recopilada",
      number: 1,
      title: "Qué información recopilamos",
      subtitle: "Categorías de datos procesados en la plataforma Alivia",
      blocks: [
        {
          type: "paragraph",
          html: "Para brindar un servicio asistencial seguro y personalizado, recopilamos y procesamos únicamente los datos mínimos indispensables para el funcionamiento del ecosistema Alivia.",
        },
        {
          type: "cards",
          items: [
            {
              icon: "user",
              title: "Persona asistida y cuidador",
              text: "Nombres completos, datos de contacto de emergencia, relación de cuidado y preferencias de configuración asistencial en la aplicación.",
            },
            {
              icon: "device",
              title: "Telemetría de dispositivos",
              text: "Estado operacional de los módulos (batería, conectividad Zigbee/LAN, estado de actuadores) registrado en el Hub local.",
            },
            {
              icon: "microphone",
              title: "Metadatos de interacción vocal",
              text: "Registros de ejecución de comandos en texto plano procesados localmente. El audio no se almacena en la nube.",
            },
          ],
        },
        {
          type: "callout",
          variant: "success",
          title: "Compromiso tecnológico: tu voz nunca viaja a la nube",
          text: "El reconocimiento del lenguaje natural se realiza íntegramente dentro del Hub Alivia en tu hogar. Las transmisiones hacia la app del cuidador contienen únicamente estados de eventos y alertas sin audio.",
        },
      ],
    },
    {
      id: "uso-informacion",
      number: 2,
      title: "Cómo usamos tu información",
      subtitle: "Finalidades exclusivas del tratamiento de datos",
      blocks: [
        {
          type: "paragraph",
          html: "Los datos personales recopilados se destinan estrictamente a los siguientes fines asistenciales y operacionales:",
        },
        {
          type: "list",
          items: [
            "Ejecución de comandos de automatización del hogar (luces, puertas, llamadas de auxilio).",
            "Envío de notificaciones inmediatas a la red familiar ante situaciones de emergencia.",
            "Diagnóstico preventivo y soporte técnico remoto sobre el estado de los módulos Alivia.",
            "Cumplimiento de obligaciones legales aplicables en materia de protección de datos personales.",
          ],
        },
      ],
    },
    {
      id: "compartir-informacion",
      number: 3,
      title: "Con quién compartimos tu información",
      subtitle: "Política de no venta y confidencialidad estricta",
      blocks: [
        {
          type: "paragraph",
          html: "<strong>No vendemos, alquilamos ni comercializamos</strong> tus datos personales a terceros bajo ninguna circunstancia. Solo compartimos información en los siguientes casos limitados:",
        },
        {
          type: "list",
          items: [
            "Con los cuidadores autorizados previamente designados por el usuario principal.",
            "Con proveedores de infraestructura técnica (almacenamiento de alertas) bajo contratos de confidencialidad estrictos.",
            "Cuando sea requerido por mandato judicial o autoridad competente conforme a la Ley N° 29733.",
          ],
        },
      ],
    },
    {
      id: "proteccion-informacion",
      number: 4,
      title: "Cómo protegemos tu información",
      subtitle: "Medidas de seguridad técnicas, organizativas y físicas",
      blocks: [
        {
          type: "paragraph",
          html: "Implementamos altos estándares de ciberseguridad, incluyendo cifrado de datos en tránsito (TLS 1.3) y en reposo (AES-256), aislamiento de red LAN para comandos locales y auditorías de seguridad periódicas.",
        },
      ],
    },
    {
      id: "derechos-arco",
      number: 5,
      title: "Tus derechos (ARCO)",
      subtitle: "Acceso, Rectificación, Cancelación y Oposición",
      blocks: [
        {
          type: "paragraph",
          html: "De conformidad con la Ley N° 29733 y su Reglamento, tienes derecho a ejercer en cualquier momento tus derechos de Acceso, Rectificación, Cancelación y Oposición respecto de tus datos personales.",
        },
        {
          type: "list",
          items: [
            "<strong>Acceso:</strong> Solicitar el detalle de los datos personales almacenados en nuestros bancos de datos.",
            "<strong>Rectificación:</strong> Actualizar o corregir información inexacta o incompleta.",
            "<strong>Cancelación:</strong> Solicitar la supresión de tus datos cuando hayan dejado de ser necesarios.",
            "<strong>Oposición:</strong> Oponerte al tratamiento de tus datos para finalidades específicas.",
          ],
        },
      ],
    },
    {
      id: "retencion-eliminacion",
      number: 6,
      title: "Retención y eliminación",
      subtitle: "Plazos de conservación de datos en el sistema",
      blocks: [
        {
          type: "paragraph",
          html: "Conservamos los datos personales únicamente durante la vigencia de la relación de servicio. Tras la cancelación de la cuenta, los datos se eliminan o anonimizan de forma irreversible dentro de los 30 días posteriores. TODO(legal-review)",
        },
      ],
    },
    {
      id: "cambios-politica",
      number: 7,
      title: "Cambios a esta política",
      subtitle: "Procedimiento de notificación de actualizaciones",
      blocks: [
        {
          type: "paragraph",
          html: "Notificaremos cualquier modificación relevante a esta Política de Privacidad a través de la aplicación Alivia y por correo electrónico con al menos 15 días de anticipación antes de su entrada en vigor.",
        },
      ],
    },
    {
      id: "canal-contacto",
      number: 8,
      title: "Canal oficial y contacto",
      subtitle: "Atención directa de dudas sobre privacidad y ejercicio de derechos ARCO",
      blocks: [
        {
          type: "contact",
        },
      ],
    },
  ],
};
