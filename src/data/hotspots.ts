import type { Lang } from '../i18n/ui';

export interface Hotspot {
  id: string;
  name: string;
  left: number;
  top: number;
  desc: string;
  tech: string;
  branches: string[];
}

export interface PosConfig {
  side: 'top' | 'bottom';
  offsetX: number;
}

export const getHotspots = (lang: Lang): Hotspot[] => [
  {
    id: 'cubierta-frontal',
    name: lang === 'es' ? 'Cubierta frontal' : 'Front cover',
    left: 11,
    top: 47,
    desc:
      lang === 'es'
        ? 'Carcasa blanca con anillo de aluminio y entrada de voz. Protege la electrónica y deja pasar la voz y el sonido.'
        : 'White casing with aluminum ring and voice input. Protects electronics while allowing voice and sound passthrough.',
    tech: lang === 'es' ? 'Diseño sin pantalla, solo voz.' : 'Screenless design, voice-only.',
    branches: [],
  },
  {
    id: 'microfono',
    name: lang === 'es' ? 'Micrófono MEMS I2S (INMP441)' : 'MEMS I2S Microphone (INMP441)',
    left: 34,
    top: 25,
    desc:
      lang === 'es'
        ? 'Capta la voz de la persona asistida hasta 2 metros, incluso con ruido moderado.'
        : 'Captures the assisted person\'s voice up to 2 meters away, even in moderate background noise.',
    tech: lang === 'es' ? 'Salida digital I2S con ESP32.' : 'Digital I2S output with ESP32.',
    branches: [],
  },
  {
    id: 'esp32',
    name: 'ESP32-WROOM-32',
    left: 34,
    top: 42,
    desc:
      lang === 'es'
        ? 'Detecta la palabra de activación y envía el audio al Edge por Wi-Fi o BLE.'
        : 'Detects the wake word and streams audio to the Edge via Wi-Fi or BLE.',
    tech: lang === 'es' ? 'Doble núcleo, 520 KB SRAM.' : 'Dual-core, 520 KB SRAM.',
    branches: [],
  },
  {
    id: 'anillo-led',
    name: lang === 'es' ? 'Anillo de LEDs de estado' : 'Status LED ring',
    left: 42,
    top: 47,
    desc:
      lang === 'es'
        ? 'Indica con colores y parpadeos si el dispositivo está en espera, escuchando, con batería baja o con falla.'
        : 'Indicates with colors and pulses whether the device is standby, listening, low battery, or in fault state.',
    tech: lang === 'es' ? 'Nunca depende solo del color.' : 'Never relies solely on color.',
    branches: [],
  },
  {
    id: 'altavoz',
    name: lang === 'es' ? 'Altavoz 3 W' : '3 W Speaker',
    left: 51,
    top: 47,
    desc:
      lang === 'es'
        ? 'Confirma cada acción por voz clara, por ejemplo "Listo, la puerta está abierta".'
        : 'Confirms each action with a clear voice response, for example "Done, the door is open".',
    tech: lang === 'es' ? 'Voz breve y serena, sin alarmismo.' : 'Brief and calm voice, no alarmism.',
    branches: [],
  },
  {
    id: 'amplificador',
    name: lang === 'es' ? 'Amplificador I2S (MAX98357A)' : 'I2S Amplifier (MAX98357A)',
    left: 60,
    top: 26,
    desc:
      lang === 'es'
        ? 'Convierte la señal digital de audio en sonido para el altavoz.'
        : 'Converts digital audio signals into sound for the speaker.',
    tech: lang === 'es' ? 'Conexión I2S directa.' : 'Direct I2S connection.',
    branches: [],
  },
  {
    id: 'bateria-principal',
    name: lang === 'es' ? 'Batería principal LiPo' : 'Main LiPo battery',
    left: 63,
    top: 48,
    desc:
      lang === 'es'
        ? 'Alimenta el dispositivo de forma continua y segura.'
        : 'Powers the device continuously and safely.',
    tech: '3.7 V, 300 mAh LiPo.',
    branches: [],
  },
  {
    id: 'bateria-respaldo',
    name: lang === 'es' ? 'Batería de respaldo' : 'Backup battery',
    left: 70,
    top: 54,
    desc:
      lang === 'es'
        ? 'Mantiene la voz y alertas activas aunque falle el suministro eléctrico.'
        : 'Keeps voice commands and emergency alerts active during power outages.',
    tech: lang === 'es' ? 'Funciona sin electricidad.' : 'Operates without electricity.',
    branches: [],
  },
  {
    id: 'cubierta-trasera',
    name: lang === 'es' ? 'Cubierta trasera' : 'Back cover',
    left: 84,
    top: 44,
    desc:
      lang === 'es'
        ? 'Fija el dispositivo a la pared y aloja el puerto de carga USB-C.'
        : 'Mounts the device securely to the wall and houses the USB-C charging port.',
    tech: lang === 'es' ? 'Diseño de montaje seguro.' : 'Secure mounting design.',
    branches: [],
  },
];

export const HOTSPOTS = getHotspots('es');

export const POS_CONFIG: Record<string, PosConfig> = {
  'cubierta-frontal':  { side: 'bottom', offsetX: -10 },
  'microfono':         { side: 'top',    offsetX: 0 },
  'esp32':             { side: 'bottom', offsetX: -6 },
  'anillo-led':        { side: 'top',    offsetX: 0 },
  'altavoz':           { side: 'bottom', offsetX: 0 },
  'amplificador':      { side: 'top',    offsetX: +4 },
  'bateria-principal': { side: 'bottom', offsetX: +4 },
  'bateria-respaldo':  { side: 'bottom', offsetX: +10 },
  'cubierta-trasera':  { side: 'top',    offsetX: +10 },
};

/** Animation constants */
export const DEVICE_CONSTANTS = {
  TOTAL_FRAMES: 240,
  BASE_PATH: '/device/ezgif-frame-',
  HS_SHOW_AT: 0.97,
  HS_HIDE_BELOW: 0.93,
} as const;
