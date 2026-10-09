export interface CompanyInfo {
  legalName: string;
  tradeName: string;
  privacyEmail: string;
  complianceBadges: {
    wcag: boolean;
    localEncryption: boolean;
    dataRegistry: boolean;
    dataProtectionLaw: boolean;
  };
}

export const companyInfo: CompanyInfo = {
  legalName: "Alivia Salud y Vida Asistida",
  tradeName: "Alivia",
  privacyEmail: "privacidad@alivia.care",
  complianceBadges: {
    wcag: true,
    localEncryption: true,
    dataRegistry: true,
    dataProtectionLaw: true,
  },
};
