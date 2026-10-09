export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'internet',
    question: '¿Funciona si se corta el servicio de Internet o no tengo Wi-Fi?',
    answer:
      'Alivia opera mediante procesamiento Edge en el Hub Core instalado en tu vivienda. Los comandos de voz, control de accesos y alertas funcionan al 100% incluso sin conexión a Internet o cuando el Wi-Fi falla.',
  },
  {
    id: 'puertas',
    question: '¿Es compatible con puertas convencionales en departamentos de Perú?',
    answer:
      'Sí. El actuador Alivia se adapta a la gran mayoría de puertas estándar (madera, metal, aluminio) sin obras. Se acopla sobre el marco existente y preserva el uso de la llave física en todo momento.',
  },
  {
    id: 'electricidad',
    question: '¿Qué sucede si hay un corte general de fluido eléctrico?',
    answer:
      'El Hub Alivia Core incorpora una batería LiFePO4 de grado médico que mantiene el sistema activo hasta 48 horas sin electricidad. Los actuadores incluyen liberación de emergencia manual.',
  },
  {
    id: 'disartria',
    question: '¿Cómo responde el sistema ante disartria o problemas en la pronunciación?',
    answer:
      'Los micrófonos Far-field con cancelación de ruido y preamplificación de alta sensibilidad (-42 dB) captan voz susurrada. Durante la calibración inicial el sistema aprende el perfil acústico particular del usuario.',
  },
];
