// The seven stops of the hero walk. Copy lives in the i18n files (hero.*, problem.*, howItWorks.*, twoLives.*, paseo.*).

export interface PaseoStop {
  id: string;
  /** i18n key of the place label shown in the counter and the rail */
  place: `paseo.place.${number}`;
  /** Desktop side of the text, chosen so the subject (woman, device, door) stays in view */
  side: "left" | "right";
  /** Still shown instead of the clip with reduced motion or data saver */
  still: string;
}

const clips = "/hero/clips/";

export const PASEO_STOPS: PaseoStop[] = [
  { id: "salon", place: "paseo.place.0", side: "right", still: `${clips}poster1.webp` },
  { id: "en-casa", place: "paseo.place.1", side: "right", still: `${clips}poster2.webp` },
  { id: "la-orden", place: "paseo.place.2", side: "right", still: `${clips}end2.webp` },
  { id: "la-puerta", place: "paseo.place.3", side: "left", still: `${clips}poster4.webp` },
  { id: "el-hogar", place: "paseo.place.4", side: "left", still: `${clips}end4.webp` },
  { id: "la-cocina", place: "paseo.place.5", side: "right", still: `${clips}end5.webp` },
  { id: "hogar-sereno", place: "paseo.place.6", side: "left", still: `${clips}end6.webp` },
];
