import type { useTranslations } from "../i18n/utils";

export type DeviceType = "light" | "door" | "window" | "microphone";

export interface IncludedDeviceItem {
  id: DeviceType;
  title: string;
  desc: string;
  tag: string;
}

export function getIncludedDevices(t: ReturnType<typeof useTranslations>): IncludedDeviceItem[] {
  return [
    {
      id: "light",
      title: t("includedDevices.light.title"),
      desc: t("includedDevices.light.desc"),
      tag: t("includedDevices.light.tag"),
    },
    {
      id: "door",
      title: t("includedDevices.door.title"),
      desc: t("includedDevices.door.desc"),
      tag: t("includedDevices.door.tag"),
    },
    {
      id: "window",
      title: t("includedDevices.window.title"),
      desc: t("includedDevices.window.desc"),
      tag: t("includedDevices.window.tag"),
    },
    {
      id: "microphone",
      title: t("includedDevices.microphone.title"),
      desc: t("includedDevices.microphone.desc"),
      tag: t("includedDevices.microphone.tag"),
    },
  ];
}
