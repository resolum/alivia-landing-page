# Alivia Landing Page

`alivia-landing-page` is the official landing page of Alivia, a voice-controlled home automation system for people with severe motor disabilities, with a companion app for their family members and caregivers.

The website introduces the product, explains how it works, showcases the IoT device ecosystem, and guides visitors toward the available plans and the mobile app download.

## About Alivia

Alivia is built around two complementary IoT devices that work together without depending on the Internet:

- **Voice recognition device:** captures the voice of the assisted person, detects the wake word, and sends the command to a local Edge node for transcription.
- **Actuator device:** receives the recognized command and performs the physical action on a door, window, or light through servo motors and a relay.

A caregiver app complements the system with remote supervision, emergency alerts, and care scheduling.

## Purpose

The main purpose of the landing page is to present Alivia clearly and build trust with potential customers, their families, and caregivers.

In the current version, the website focuses on:

- Explaining what Alivia is and who it is for.
- Showing the benefits for both the assisted person and the caregiver.
- Presenting the device ecosystem with an interactive exploded view.
- Providing accessible audiovisual content with a text alternative.
- Showing testimonials and the team behind the project.
- Presenting the available plans and redirecting to the web application to subscribe.
- Promoting the download of the caregiver mobile app.
- Answering frequently asked questions.

## Project Structure

```text
alivia-landing-page/
├── README.md
├── LICENSE.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── astro.config.mjs
├── tsconfig.json
├── public/
│   ├── device/                       # Frames of the device exploded-view animation
│   ├── hero/                         # Frames of the hero logo animation
│   ├── favicon.ico
│   ├── favicon.svg
│   └── logo.ico
└── src/
    ├── assets/                       # Images (team photos, illustrations, logo)
    ├── components/
    │   ├── ui/                       # Reusable generic components
    │   │   ├── Badge.astro
    │   │   ├── Button.astro
    │   │   ├── Callout.astro
    │   │   ├── PlanCard.astro
    │   │   ├── SectionHeader.astro
    │   │   ├── TeamCard.astro
    │   │   └── TestimonialCard.astro
    │   ├── legal/                    # Components specific to legal documents
    │   │   ├── ContactCard.astro
    │   │   ├── LegalBlocks.astro
    │   │   ├── LegalHero.astro
    │   │   ├── LegalLayout.astro
    │   │   ├── LegalSection.astro
    │   │   ├── PrivacyPolicyContent.astro
    │   │   ├── ReadingSizeToggle.astro
    │   │   ├── TableOfContents.astro
    │   │   └── TermsContent.astro
    │   ├── DeviceExplode.astro
    │   ├── DevicesSection.astro
    │   ├── DownloadAppSection.astro
    │   ├── FaqSection.astro
    │   ├── FooterSection.astro
    │   ├── HeroAnimation.astro
    │   ├── HeroSection.astro
    │   ├── LandingContent.astro      # Shared ordered list of landing sections
    │   ├── LanguageSwitcher.astro
    │   ├── ManifestoSection.astro
    │   ├── MediaSection.astro
    │   ├── NavBar.astro
    │   ├── PhoneMockup.astro
    │   ├── PlansSection.astro
    │   ├── ScrollToTop.astro
    │   ├── TeamSection.astro
    │   ├── TestimonialsSection.astro
    │   └── TwoLivesSection.astro
    ├── data/                         # Typed content, separated from components
    │   ├── legal/
    │   │   ├── config.ts
    │   │   ├── index.ts
    │   │   ├── privacy.en.ts
    │   │   ├── privacy.es.ts
    │   │   ├── terms.en.ts
    │   │   ├── terms.es.ts
    │   │   └── types.ts
    │   ├── company.ts                # Single source of company and contact data
    │   ├── faq.ts
    │   ├── hotspots.ts
    │   ├── nav.ts
    │   ├── plans.ts
    │   ├── team.ts
    │   └── testimonials.ts
    ├── i18n/                         # Native Astro i18n (en default, es)
    │   ├── locales/
    │   │   ├── en/                   # English UI strings, one file per section
    │   │   │   ├── devices.ts
    │   │   │   ├── download.ts
    │   │   │   ├── faq.ts
    │   │   │   ├── footer.ts
    │   │   │   ├── hero.ts
    │   │   │   ├── legal.ts
    │   │   │   ├── media.ts
    │   │   │   ├── nav.ts
    │   │   │   ├── plans.ts
    │   │   │   ├── team.ts
    │   │   │   ├── testimonials.ts
    │   │   │   └── twoLives.ts
    │   │   └── es/                   # Spanish UI strings (same keys as en)
    │   │       └── ...
    │   ├── ui.ts                     # Languages, default locale and dictionary
    │   └── utils.ts                  # Translation and path helpers
    ├── layouts/
    │   └── Layout.astro
    ├── pages/
    │   ├── en/
    │   │   └── index.astro
    │   ├── es/
    │   │   ├── index.astro
    │   │   ├── politica-de-privacidad.astro
    │   │   └── terminos-y-condiciones.astro
    │   ├── index.astro               # English home (default locale, no prefix)
    │   ├── privacy-policy.astro
    │   └── terms-and-conditions.astro
    ├── scripts/                      # Client-side logic extracted from components
    │   ├── legal/
    │   │   ├── legalInteractions.ts
    │   │   └── legalTabSlide.ts
    │   ├── deviceExplode.ts
    │   └── heroAnimation.ts
    └── styles/
        └── global.css
```

## Technology Stack

- Astro
- Tailwind CSS (integrated through the `@tailwindcss/vite` plugin)
- HTML5
- CSS3
- JavaScript (canvas-based frame playback and scroll logic)
- Vite (bundled with Astro)
- pnpm (package manager)

## Getting Started

### Prerequisites

- Node.js (a recent LTS version)
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/resolum/alivia-landing-page.git
cd alivia-landing-page

# Install the dependencies
pnpm install
```

The project uses Tailwind CSS through its Vite plugin. If you set up the project from scratch, install it with:

```bash
pnpm install tailwindcss @tailwindcss/vite
```

### Development

```bash
pnpm run dev
```

The site will be available at `http://localhost:4321`.

### Production build

```bash
pnpm build
pnpm preview
```
