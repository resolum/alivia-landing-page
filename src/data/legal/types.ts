export type Block =
  | { type: "paragraph"; html: string }
  | { type: "list"; items: string[] }
  | { type: "cards"; items: { icon: string; title: string; text: string }[] }
  | { type: "callout"; variant: "info" | "success" | "warning"; title: string; text: string }
  | { type: "contact" };

export interface LegalSectionItem {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  blocks: Block[];
}

export interface LegalDoc {
  meta: {
    title: string;
    description: string;
    updated: string;
    badge?: string;
    version: string;
  };
  introCard?: {
    badge?: string;
    title: string;
    text: string;
  };
  sections: LegalSectionItem[];
}
