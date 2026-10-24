import type { Lang } from "../i18n/ui";

export type VideoProvider = "file" | "youtube";

export interface VideoCaptionTrack {
  src: string;
  srcLang: string;
  label: string;
  default?: boolean;
}

export interface VideoItem {
  id: "product" | "team";
  provider: VideoProvider;
  source: string;
  poster?: string;
  title: string;
  description: string;
  duration?: string;
  captions: VideoCaptionTrack[];
  externalUrl?: string;
  temporary?: boolean;
}

const PRODUCT_VIDEO = "/videos/alivia-producto.mp4";
const PRODUCT_POSTER = "/videos/alivia-producto-poster.jpg";

export const getProductVideo = (lang: Lang): VideoItem => ({
  id: "product",
  provider: "file",
  source: PRODUCT_VIDEO,
  poster: PRODUCT_POSTER,
  title:
    lang === "es"
      ? "Presentación del producto Alivia"
      : "Alivia product presentation",
  description:
    lang === "es"
      ? "Recorrido por el dispositivo Alivia y los módulos que permiten controlar la luz, la puerta y la ventana por voz."
      : "A walkthrough of the Alivia device and the modules that enable voice control of lights, doors, and windows.",
  duration: "00:32",
  captions: [
    {
      src: "/videos/alivia-producto.es.vtt",
      srcLang: "es",
      label: "Español",
      default: lang === "es",
    },
    {
      src: "/videos/alivia-producto.en.vtt",
      srcLang: "en",
      label: "English",
      default: lang === "en",
    },
  ],
  externalUrl: PRODUCT_VIDEO,
});

export const getTeamVideo = (lang: Lang): VideoItem => ({
  id: "team",
  provider: "youtube",
  source: "https://www.youtube.com/embed/VIDEO_ID_HERE?autoplay=1",
  title:
    lang === "es" ? "Presentación del equipo" : "Team presentation",
  description:
    lang === "es"
      ? "Conoce al equipo responsable del desarrollo de Alivia."
      : "Meet the team behind Alivia.",
  captions: [],
  externalUrl: `https://www.youtube.com/embed/VIDEO_ID_HERE?autoplay=1`,
  temporary: true,
});
