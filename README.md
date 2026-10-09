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
├── package.json
├── pnpm-lock.yaml
├── public/
│   ├── device/              # Frames of the device exploded-view animation
│   ├── hero/                # Frames of the hero logo animation
│   ├── favicon.ico
│   └── favicon.svg
└── src/
    ├── assets/
    ├── components/
    │   ├── DeviceExplode.astro
    │   ├── DevicesSection.astro
    │   ├── DownloadAppSection.astro
    │   ├── FaqSection.astro
    │   ├── FooterSection.astro
    │   ├── HeroAnimation.astro
    │   ├── HeroSection.astro
    │   ├── ManifestoSection.astro
    │   ├── MediaSection.astro
    │   ├── NavBar.astro
    │   ├── PhoneMockup.astro
    │   ├── PlansSection.astro
    │   ├── TeamSection.astro
    │   ├── TestimonialsSection.astro
    │   ├── TwoLivesSection.astro
    │   └── Welcome.astro
    ├── layouts/
    │   └── Layout.astro
    ├── pages/
    │   └── index.astro
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
