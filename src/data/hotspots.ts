export interface Hotspot {
  id: string;
  name: string;
  /** Percentage position (0-100) from the left of the rendered image */
  left: number;
  /** Percentage position (0-100) from the top of the rendered image */
  top: number;
  desc: string;
  tech: string;
  branches: string[];
}

export interface PosConfig {
  side: 'top' | 'bottom';
  offsetX: number;
}

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'cubierta-frontal',
    name: 'Cubierta frontal',
    left: 11,
    top: 47,
    desc: 'Carcasa blanca con anillo de aluminio y entrada de voz. Protege la electrónica y deja pasar la voz y el sonido.',
    tech: 'Diseño sin pantalla, solo voz.',
    branches: [],
  },
  {
    id: 'microfono',
    name: 'Micrófono MEMS I2S (INMP441)',
    left: 34,
    top: 25,
    desc: 'Capta la voz de la persona asistida hasta 2 metros, incluso con ruido moderado.',
    tech: 'Salida digital I2S con ESP32.',
    branches: [],
  },
  {
    id: 'esp32',
    name: 'ESP32-WROOM-32',
    left: 34,
    top: 42,
    desc: 'Detecta la palabra de activación y envía el audio al Edge por Wi-Fi o BLE.',
    tech: 'Doble núcleo, 520 KB SRAM.',
    branches: [],
  },
  {
    id: 'anillo-led',
    name: 'Anillo de LEDs de estado',
    left: 42,
    top: 47,
    desc: 'Indica con colores y parpadeos si el dispositivo está en espera, escuchando, con batería baja o con falla.',
    tech: 'Nunca depende solo del color.',
    branches: [],
  },
  {
    id: 'altavoz',
    name: 'Altavoz 3 W',
    left: 51,
    top: 47,
    desc: 'Confirma cada acción por voz clara, por ejemplo "Listo, la puerta está abierta".',
    tech: 'Voz breve y serena, sin alarmismo.',
    branches: [],
  },
  {
    id: 'amplificador',
    name: 'Amplificador I2S (MAX98357A)',
    left: 60,
    top: 26,
    desc: 'Convierte la señal digital de audio en sonido para el altavoz.',
    tech: 'Conexión I2S directa.',
    branches: [],
  },
  {
    id: 'bateria-principal',
    name: 'Batería principal LiPo',
    left: 63,
    top: 48,
    desc: 'Alimenta el dispositivo de forma continua y segura.',
    tech: '3.7 V, 300 mAh LiPo.',
    branches: [],
  },
  {
    id: 'bateria-respaldo',
    name: 'Batería de respaldo',
    left: 70,
    top: 54,
    desc: 'Mantiene la voz y alertas activas aunque falle el suministro eléctrico.',
    tech: 'Funciona sin electricidad.',
    branches: [],
  },
  {
    id: 'cubierta-trasera',
    name: 'Cubierta trasera',
    left: 84,
    top: 44,
    desc: 'Fija el dispositivo a la pared y aloja el puerto de carga USB-C.',
    tech: 'Diseño de montaje seguro.',
    branches: [],
  },
];

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
