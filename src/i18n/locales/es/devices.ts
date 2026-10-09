import type { devices as devicesEn } from "../en/devices";

export const devices = {
  "devices.badge": "Ingeniería Embebida · Cero Suscripción Forzosa",
  "devices.title": "El Ecosistema Alivia en tu Habitación",
  "devices.desc":
    "Módulos interoperables sin cables expuestos, diseñados con estándares biomédicos.",
  "devices.canvasLabel": "Animación del dispositivo Alivia",
  "devices.scrollHint": "Desplázate para explorar",
  "devices.hotspot.closeLabel": "Cerrar",
  "devices.hotspot.infoPrefix": "Información de",
} satisfies Record<keyof typeof devicesEn, string>;
