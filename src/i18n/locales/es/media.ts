import type { media as mediaEn } from "../en/media";

export const media = {
  "media.badge": "Demostración Accesible (US02)",
  "media.title": "Alivia en acción: experiencia en el hogar",
  "media.desc":
    "Demostración en video accesible con opciones avanzadas de reproducción e interpretación sensorial completa.",
  "media.videoTitle": "Ver video demostrativo de Alivia",
  "media.videoDuration":
    "Duración total: 02:45 min • Incluye audio descriptivo y señas",
  "media.controlsLabel": "Controles de accesibilidad del reproductor",
  "media.subtitles": "Subtítulos (CC)",
  "media.subtitlesAriaLabel": "Activar o desactivar subtítulos (CC)",
  "media.signLanguage": "Lengua de señas",
  "media.signLanguageAriaLabel": "Activar ventana de lengua de señas",
  "media.audiodesc": "Audio descriptivo (AD)",
  "media.audiodescAriaLabel": "Activar pista de audio descriptivo",
  "media.showTranscript": "Ver Transcripción Completa",
  "media.hideTranscript": "Ocultar Transcripción",
  "media.transcriptLabel": "Transcripción textual equivalente del video",
  "media.transcriptTitle": "Transcripción completa del video asistencial",
  "media.transcriptAltLabel": "Texto alternativo accesible",
  "media.transcript.p1":
    "[00:00 – 00:30] Una persona asistida en silla de ruedas entra a la habitación. Al decir con voz clara “Alivia, abrir puerta principal”, el actuador motorizado desengancha el pestillo de forma fluida y la puerta se abre de par en par.",
  "media.transcript.p2":
    "[00:30 – 01:15] Al caer la tarde, la persona indica “Alivia, modo lectura”. El Hub Alivia Core procesa el comando localmente sin enviar datos fuera de la vivienda e incrementa la iluminación ambiente al 80 % cálido.",
  "media.transcript.p3":
    "[01:15 – 02:10] En pantalla secundaria se observa la aplicación móvil en el teléfono de la cuidadora familiar, donde recibe una notificación silenciosa indicando que el comando fue ejecutado con éxito y la rutina de tarde está activa.",
  "media.transcript.p4":
    "[02:10 – 02:45] El video concluye mostrando la pantalla del Hub Alivia Core procesando en modo offline con el indicador LED en color verde turquesa continuo.",
} satisfies Record<keyof typeof mediaEn, string>;
