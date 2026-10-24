import type { includedDevices as includedDevicesEn } from "../en/includedDevices";

export const includedDevices = {
  "includedDevices.badge": "Equipamiento incluido",
  "includedDevices.title": "Los dispositivos que hacen posible la autonomía",
  "includedDevices.desc":
    "Cada kit de Alivia integra los módulos necesarios para actuar sobre el entorno. Estos son los cuatro componentes principales.",
  "includedDevices.listLabel": "Dispositivos incluidos en Alivia",
  "includedDevices.light.title": "Módulo de iluminación",
  "includedDevices.light.desc":
    "Enciende, apaga y regula las luces de la habitación por voz, sin levantarse ni buscar interruptores.",
  "includedDevices.light.tag": "Control por voz",
  "includedDevices.door.title": "Actuador de puerta",
  "includedDevices.door.desc":
    "Abre y cierra la puerta principal de forma segura, con liberación manual para emergencias.",
  "includedDevices.door.tag": "Acceso autónomo",
  "includedDevices.window.title": "Actuador de ventana",
  "includedDevices.window.desc":
    "Regula la ventilación y la entrada de luz abriendo o cerrando la ventana a distancia.",
  "includedDevices.window.tag": "Ventilación y luz natural",
  "includedDevices.microphone.title": "Micrófono de largo alcance",
  "includedDevices.microphone.desc":
    "Capta comandos y pedidos de auxilio desde hasta dos metros, incluso con ruido moderado.",
  "includedDevices.microphone.tag": "Manos libres",
  "includedDevices.note":
    "La composición del kit se ajusta a cada hogar durante la instalación. Consulta los planes para conocer las opciones disponibles.",
  "includedDevices.plansCta": "Ver planes y equipamiento",
} satisfies Record<keyof typeof includedDevicesEn, string>;
