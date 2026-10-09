import type { Lang } from '../i18n/ui';

export interface Testimonial {
  id: string;
  quote: string;
  initials: string | null;
  name: string;
  location: string;
  role: string;
  avatarVariant: 'primary' | 'secondary' | 'neutral';
  anonymous?: boolean;
}

export const getTestimonialsColUp = (lang: Lang): Testimonial[] => [
  {
    id: 'sebastian-valdivia',
    quote:
      lang === 'es'
        ? '«Al tener tetraplejía C5-C6, depender de alguien para encender la luz o abrir la puerta era agotador. Con Alivia no necesito hablar fuerte; susurro y el sistema reacciona en menos de un segundo.»'
        : '«With C5-C6 tetraplegia, depending on someone to turn on the light or open the door was exhausting. With Alivia, I don\'t need to speak loudly; I whisper, and the system responds in under a second.»',
    initials: 'SV',
    name: 'Sebastián Valdivia',
    location: 'Lima, Perú',
    role: lang === 'es' ? 'Usuario titular' : 'Primary user',
    avatarVariant: 'primary',
  },
  {
    id: 'roberto-q',
    quote:
      lang === 'es'
        ? '«La instalación en Trujillo fue impecable: en dos horas dejaron la puerta motorizada y operativa sin dañar el marco colonial de cedro. El respeto y discreción del equipo técnico fue insuperable.»'
        : '«Installation in Trujillo was flawless: in two hours they left the door motorized and operational without damaging the cedar frame. The respect and discretion of the technical team were unmatched.»',
    initials: null,
    name: 'Roberto Q.',
    location: 'Trujillo, Perú',
    role: lang === 'es' ? 'Familiar' : 'Family member',
    avatarVariant: 'neutral',
    anonymous: true,
  },
  {
    id: 'sofia-morales',
    quote:
      lang === 'es'
        ? '«La función de iluminación suave que gradúa los ciclos de descanso ha transformado por completo el sueño de mi hermana sin alterar la rutina nocturna de la casa.»'
        : '«The soft lighting feature that adjusts rest cycles has completely transformed my sister\'s sleep without altering the household\'s evening routine.»',
    initials: 'SM',
    name: 'Sofía Morales',
    location: 'Chiclayo, Perú',
    role: lang === 'es' ? 'Cuidadora' : 'Caregiver',
    avatarVariant: 'primary',
  },
];

export const getTestimonialsColDown = (lang: Lang): Testimonial[] => [
  {
    id: 'lucia-mendoza',
    quote:
      lang === 'es'
        ? '«Lo que más valoramos como familia es que no depende del internet. Si se va la luz o el Wi-Fi cae, la batería LiFePO4 de 48 horas sigue activa y nos brinda una calma incalculable.»'
        : '«What we value most as a family is that it doesn\'t depend on the Internet. If power or Wi-Fi drops, the 48-hour LiFePO4 battery stays active, giving us invaluable peace of mind.»',
    initials: 'LM',
    name: 'Lucía Mendoza',
    location: 'Arequipa, Perú',
    role: lang === 'es' ? 'Cuidadora' : 'Caregiver',
    avatarVariant: 'secondary',
  },
  {
    id: 'mateo-collins',
    quote:
      lang === 'es'
        ? '«Poder cerrar la puerta por mi cuenta cuando recibo a mis amigos o trabajo en la computadora me devolvió una dignidad que creí haber perdido por completo.»'
        : '«Being able to close the door on my own when receiving friends or working on my computer gave me back a dignity I thought I had lost completely.»',
    initials: 'MC',
    name: 'Mateo Collins',
    location: 'Lima, Perú',
    role: lang === 'es' ? 'Usuario independiente' : 'Independent user',
    avatarVariant: 'secondary',
  },
  {
    id: 'carlos-aguirre',
    quote:
      lang === 'es'
        ? '«La alerta de socorro por voz directa nos quitó de encima la angustia constante de vigilar a través de cámaras invasivas en el dormitorio.»'
        : '«The direct voice distress alert removed the constant anxiety of monitoring through invasive cameras in the bedroom.»',
    initials: 'CA',
    name: 'Carlos Aguirre',
    location: 'Cusco, Perú',
    role: lang === 'es' ? 'Familiar directo' : 'Direct family member',
    avatarVariant: 'secondary',
  },
];

export const TESTIMONIALS_COL_UP = getTestimonialsColUp('es');
export const TESTIMONIALS_COL_DOWN = getTestimonialsColDown('es');
