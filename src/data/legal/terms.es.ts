import type { LegalDoc } from "./types";
import { legalConfig } from "./config";

export const termsDocEs: LegalDoc = {
  meta: {
    title: "Términos y Condiciones de Uso - Alivia",
    description: "Términos y condiciones contractuales de uso de la plataforma y dispositivos Alivia en Perú.",
    updated: legalConfig.terms.lastUpdated.es,
    version: legalConfig.terms.version,
    badge: "Contrato de Servicio",
  },
  introCard: {
    badge: "Transparencia y Claridad",
    title: "Compromiso de accesibilidad y servicio asistencial",
    text: "Los presentes Términos regulan el uso del sistema de control por voz Alivia, los módulos IoT del hogar y la aplicación para cuidadores. Diseñados para brindar autonomía con máxima seguridad técnica y respeto al usuario.",
  },
  sections: [
    {
      id: "aceptacion-terminos",
      number: 1,
      title: "Aceptación de los términos",
      subtitle: "Vínculo jurídico y conformidad del usuario",
      blocks: [
        {
          type: "paragraph",
          html: "Al contratar, instalar o utilizar cualquier componente del ecosistema Alivia, el usuario y sus cuidadores autorizados aceptan expresamente estar vinculados por estos Términos y Condiciones.",
        },
      ],
    },
    {
      id: "descripcion-servicio",
      number: 2,
      title: "Descripción del servicio y evaluación de viabilidad",
      subtitle: "Naturaleza de la solución asistencial",
      blocks: [
        {
          type: "paragraph",
          html: "Alivia provee una solución integral de domótica asistencial por voz con procesamiento 100% local, orientada a personas con limitaciones de movilidad o coordinación motora.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Requisito indispensable: evaluación técnica previa",
          text: "Antes de concretar la instalación final, un técnico especializado evaluará la infraestructura eléctrica y acústica de la habitación para garantizar una tasa de respuesta vocal óptima.",
        },
      ],
    },
    {
      id: "registro-cuenta",
      number: 3,
      title: "Registro y cuenta del hogar",
      subtitle: "Gestión de accesos y perfiles de cuidado",
      blocks: [
        {
          type: "paragraph",
          html: "El usuario o su apoderado legal se compromete a proporcionar datos veraces durante el registro de la cuenta del hogar y la configuración de los contactos de auxilio.",
        },
      ],
    },
    {
      id: "planes-facturacion",
      number: 4,
      title: "Planes, precios y facturación transparente",
      subtitle: "Condiciones económicas y modalidades de adquisición",
      blocks: [
        {
          type: "paragraph",
          html: "Alivia ofrece modalidades de suscripción o adquisición de equipos con precios transparentes sin cobros ocultos ni permanencias forzosas indebidas.",
        },
        {
          type: "callout",
          variant: "success",
          title: "Custodia temporal del pago",
          text: "El monto correspondiente a la suscripción inicial o equipos queda retenido de forma transparente hasta que la instalación técnica en el hogar sea verificada y aprobada por el usuario.",
        },
        {
          type: "cards",
          items: [
            {
              icon: "credit-card",
              title: "Pagos transparentes",
              text: "Sin comisiones ocultas. Los cobros de renovación se notifican antes de ser procesados.",
            },
            {
              icon: "shield-check",
              title: "Sin permanencia obligatoria",
              text: "Puedes solicitar la baja de la suscripción con 15 días de preaviso previo al siguiente ciclo.",
            },
          ],
        },
      ],
    },
    {
      id: "instalacion-garantias",
      number: 5,
      title: "Instalación y garantías asistenciales",
      subtitle: "Protección integral del equipamiento y nivel de servicio",
      blocks: [
        {
          type: "paragraph",
          html: "Ofrecemos garantías claras respaldadas por nuestro equipo técnico especializado.",
        },
        {
          type: "cards",
          items: [
            {
              icon: "badge-check",
              title: "Garantía de satisfacción 30 días",
              text: "Si el sistema no se adecúa a las necesidades de asistencia vocal en los primeros 30 días, se reembolsará el importe del equipo previa devolución en buen estado.",
            },
            {
              icon: "cpu",
              title: "Garantía de hardware 12 meses",
              text: "Cobertura total por defectos de fabricación en el Hub local, micrófonos de ambiente y actuadores inteligentes.",
            },
          ],
        },
      ],
    },
    {
      id: "uso-aceptable",
      number: 6,
      title: "Uso aceptable del ecosistema",
      subtitle: "Pautas de utilización responsable y seguridad física",
      blocks: [
        {
          type: "paragraph",
          html: "El sistema Alivia debe utilizarse de conformidad con el manual de uso asistencial. Queda prohibida la manipulación física no autorizada del Hub local o intentos de ingeniería inversa de los algoritmos de voz.",
        },
      ],
    },
    {
      id: "limitacion-responsabilidad",
      number: 7,
      title: "Limitación de responsabilidad y naturaleza del servicio",
      subtitle: "Alcance asistencial no médico del sistema",
      blocks: [
        {
          type: "paragraph",
          html: "Alivia constituye una herramienta tecnológica de auxilio y domótica adaptada, pero no reemplaza la atención médica de emergencia profesional ni la supervisión humana directa cuando sea requerida.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Aviso asistencial crucial",
          text: "Alivia no es un dispositivo médico ni un sistema de soporte vital de emergencia regulado sanitariamente. Ante emergencias médicas de extrema gravedad, comuníquese directamente con los servicios públicos de rescate (106 / 116).",
        },
      ],
    },
    {
      id: "suspension-cancelacion",
      number: 8,
      title: "Suspensión y cancelación del servicio",
      subtitle: "Causales y procedimiento de baja",
      blocks: [
        {
          type: "paragraph",
          html: "El usuario puede cancelar el servicio en cualquier momento desde la aplicación o comunicándose con nuestro canal de atención. Alivia se reserva el derecho de suspender accesos únicamente por incumplimiento grave de estos Términos o uso fraudulento.",
        },
      ],
    },
    {
      id: "modificaciones-terminos",
      number: 9,
      title: "Modificaciones a los términos",
      subtitle: "Actualizaciones periódicas de las condiciones contractuales",
      blocks: [
        {
          type: "paragraph",
          html: "Cualquier cambio relevante a las condiciones del contrato será notificado a través de los medios oficiales con 15 días de anticipación. TODO(legal-review)",
        },
      ],
    },
    {
      id: "ley-jurisdiccion",
      number: 10,
      title: "Ley aplicable, jurisdicción y contacto",
      subtitle: "Marco legal peruano y solución de controversias",
      blocks: [
        {
          type: "paragraph",
          html: "Estos Términos se rigen por la legislación de la República del Perú. Cualquier controversia será sometida a la jurisdicción de los jueces y tribunales del Distrito Judicial de Lima.",
        },
        {
          type: "contact",
        },
      ],
    },
  ],
};
