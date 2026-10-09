import type { Lang } from '../i18n/ui';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const getFaqItems = (lang: Lang): FaqItem[] => [
  {
    id: 'internet',
    question:
      lang === 'es'
        ? '¿Funciona si se corta el servicio de Internet o no tengo Wi-Fi?'
        : 'Does it work if Internet service drops or if I don’t have Wi-Fi?',
    answer:
      lang === 'es'
        ? 'Alivia opera mediante procesamiento Edge en el Hub Core instalado en tu vivienda. Los comandos de voz, control de accesos y alertas funcionan al 100% incluso sin conexión a Internet o cuando el Wi-Fi falla.'
        : 'Alivia operates via Edge processing on the Hub Core installed in your home. Voice commands, access control, and alerts remain 100% functional even without an Internet connection or during Wi-Fi outages.',
  },
  {
    id: 'puertas',
    question:
      lang === 'es'
        ? '¿Es compatible con puertas convencionales en departamentos de Perú?'
        : 'Is it compatible with standard doors?',
    answer:
      lang === 'es'
        ? 'Sí. El actuador Alivia se adapta a la gran mayoría de puertas estándar (madera, metal, aluminio) sin obras. Se acopla sobre el marco existente y preserva el uso de la llave física en todo momento.'
        : 'Yes. The Alivia actuator adapts to the vast majority of standard doors (wood, metal, aluminum) without construction work. It mounts over the existing frame while preserving physical key usage at all times.',
  },
  {
    id: 'electricidad',
    question:
      lang === 'es'
        ? '¿Qué sucede si hay un corte general de fluido eléctrico?'
        : 'What happens if there is a general power outage?',
    answer:
      lang === 'es'
        ? 'El Hub Alivia Core incorpora una batería LiFePO4 de grado médico que mantiene el sistema activo hasta 48 horas sin electricidad. Los actuadores incluyen liberación de emergencia manual.'
        : 'The Alivia Hub Core includes a medical-grade LiFePO4 battery that keeps the system active for up to 48 hours without electricity. Actuators include manual emergency release.',
  },
  {
    id: 'disartria',
    question:
      lang === 'es'
        ? '¿Cómo responde el sistema ante disartria o problemas en la pronunciación?'
        : 'How does the system respond to dysarthria or speech variations?',
    answer:
      lang === 'es'
        ? 'Los micrófonos Far-field con cancelación de ruido y preamplificación de alta sensibilidad (-42 dB) captan voz susurrada. Durante la calibración inicial el sistema aprende el perfil acústico particular del usuario.'
        : 'Far-field microphones with noise cancellation and high sensitivity (-42 dB) pre-amplification capture whispered or impaired speech. During initial calibration, the system learns the user\'s specific acoustic profile.',
  },
];

export const FAQ_ITEMS = getFaqItems('es');
