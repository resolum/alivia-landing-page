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

export const TESTIMONIALS_COL_UP: Testimonial[] = [
  {
    id: 'sebastian-valdivia',
    quote:
      '«Al tener tetraplejía C5-C6, depender de alguien para encender la luz o abrir la puerta era agotador. Con Alivia no necesito hablar fuerte; susurro y el sistema reacciona en menos de un segundo.»',
    initials: 'SV',
    name: 'Sebastián Valdivia',
    location: 'Lima, Perú',
    role: 'Usuario titular',
    avatarVariant: 'primary',
  },
  {
    id: 'roberto-q',
    quote:
      '«La instalación en Trujillo fue impecable: en dos horas dejaron la puerta motorizada y operativa sin dañar el marco colonial de cedro. El respeto y discreción del equipo técnico fue insuperable.»',
    initials: null,
    name: 'Roberto Q.',
    location: 'Trujillo, Perú',
    role: 'Familiar',
    avatarVariant: 'neutral',
    anonymous: true,
  },
  {
    id: 'sofia-morales',
    quote:
      '«La función de iluminación suave que gradúa los ciclos de descanso ha transformado por completo el sueño de mi hermana sin alterar la rutina nocturna de la casa.»',
    initials: 'SM',
    name: 'Sofía Morales',
    location: 'Chiclayo, Perú',
    role: 'Cuidadora',
    avatarVariant: 'primary',
  },
];

export const TESTIMONIALS_COL_DOWN: Testimonial[] = [
  {
    id: 'lucia-mendoza',
    quote:
      '«Lo que más valoramos como familia es que no depende del internet. Si se va la luz o el Wi-Fi cae, la batería LiFePO4 de 48 horas sigue activa y nos brinda una calma incalculable.»',
    initials: 'LM',
    name: 'Lucía Mendoza',
    location: 'Arequipa, Perú',
    role: 'Cuidadora',
    avatarVariant: 'secondary',
  },
  {
    id: 'mateo-collins',
    quote:
      '«Poder cerrar la puerta por mi cuenta cuando recibo a mis amigos o trabajo en la computadora me devolvió una dignidad que creí haber perdido por completo.»',
    initials: 'MC',
    name: 'Mateo Collins',
    location: 'Lima, Perú',
    role: 'Usuario independiente',
    avatarVariant: 'secondary',
  },
  {
    id: 'carlos-aguirre',
    quote:
      '«La alerta de socorro por voz directa nos quitó de encima la angustia constante de vigilar a través de cámaras invasivas en el dormitorio.»',
    initials: 'CA',
    name: 'Carlos Aguirre',
    location: 'Cusco, Perú',
    role: 'Familiar directo',
    avatarVariant: 'secondary',
  },
];
