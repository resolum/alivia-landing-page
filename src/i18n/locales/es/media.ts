import type { media as mediaEn } from "../en/media";

export const media = {
  "media.badge": "Demostración audiovisual",
  "media.title": "Alivia en acción: experiencia en el hogar",
  "media.desc":
    "Video demostrativo del producto con subtítulos en español e inglés y transcripción completa como alternativa textual accesible.",
  "media.videoTitle": "Presentación del producto Alivia",
  "media.videoClick": "Reproduce el video para conocer cómo funciona Alivia",
  "media.videoDuration": "Duración: 00:32 • Subtítulos en español e inglés",
  "media.videoUnavailable":
    "El video no pudo reproducirse. Puedes consultar la transcripción completa, que contiene la misma información.",
  "media.videoFallbackLink": "Ver transcripción alternativa",
  "media.videoExternalLink": "Abrir video en una nueva pestaña",
  "media.showTranscript": "Ver Transcripción Completa",
  "media.hideTranscript": "Ocultar Transcripción",
  "media.transcriptLabel": "Transcripción textual equivalente del video",
  "media.transcriptTitle": "Transcripción completa del video del producto",
  "media.transcriptAltLabel": "Texto alternativo accesible",
  "media.transcript.p1":
    "[00:00 – 00:08] Alivia es un sistema de domótica asistida por voz para personas con discapacidad motora severa.",
  "media.transcript.p2":
    "[00:08 – 00:16] Un micrófono de largo alcance capta la orden y el Hub la procesa localmente, sin depender de Internet.",
  "media.transcript.p3":
    "[00:16 – 00:24] Los módulos de luz, puerta y ventana ejecutan la acción solicitada en milisegundos.",
  "media.transcript.p4":
    "[00:24 – 00:32] La persona gana autonomía y seguridad, mientras su cuidador recibe confirmación y alertas en la aplicación.",
} satisfies Record<keyof typeof mediaEn, string>;
