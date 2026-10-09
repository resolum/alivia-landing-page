import type { Lang } from '../i18n/ui';
import oscarImg from '../assets/oscar.jpg';
import renatoImg from '../assets/renato.png';
import faridImg from '../assets/farid.png';
import matiasImg from '../assets/matias.png';
import nicolasImg from '../assets/nicolas.png';
import dayroImg from '../assets/dayro.png';

export interface TeamMember {
  id: string;
  name: string;
  code: string;
  bio: string;
  iconPath: string;
  image?: ImageMetadata;
}

export const getTeamMembers = (lang: Lang): TeamMember[] => [
  {
    id: 'oscar-armas',
    name: 'Oscar Javier Armas Sánchez',
    code: 'u20211G192',
    bio:
      lang === 'es'
        ? 'Soy estudiante de Ingeniería de Software, con interés en el desarrollo de software y la arquitectura de sistemas. Me gusta involucrarme en distintas etapas de un proyecto, desde el análisis de requisitos hasta la implementación de soluciones, y disfruto trabajar en equipo compartiendo conocimientos y aprendiendo de mis compañeros. Busco seguir fortaleciendo mis habilidades técnicas y aportar una visión práctica y organizada que ayude al equipo a alcanzar los objetivos del proyecto.'
        : 'I am a Software Engineering student interested in software development and system architecture. I enjoy being involved in different stages of a project, from requirements analysis to implementation, and I thrive in team environments sharing knowledge and learning from peers. I seek to continue strengthening my technical skills and provide a practical, organized vision to help the team achieve project goals.',
    iconPath:
      'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
    image: oscarImg,
  },
  {
    id: 'renato-calvo',
    name: 'Renato Guillermo Calvo Yalan',
    code: 'u202217053',
    bio:
      lang === 'es'
        ? 'Soy estudiante de Ingeniería de Software y me interesa especialmente la ciberseguridad y la inteligencia artificial, áreas en las que quiero seguir desarrollándome y aplicar mis conocimientos en proyectos reales. Considero que una de mis principales fortalezas es el liderazgo, ya que me gusta organizar el trabajo, asumir responsabilidades y ayudar a que un equipo avance hacia sus objetivos. También me considero una persona perseverante, con conocimientos en distintos lenguajes de programación y muchas ganas de seguir aprendiendo.'
        : 'I am a Software Engineering student particularly interested in cybersecurity and artificial intelligence, fields where I aim to continue developing and applying my knowledge to real-world projects. I consider leadership to be one of my key strengths, organizing work, taking responsibility, and driving team success. I am also persevering, skilled in multiple programming languages, and eager to learn.',
    iconPath:
      'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    image: renatoImg,
  },
  {
    id: 'farid-coronel',
    name: 'Farid Sebastian Coronel Espinoza',
    code: 'u202312508',
    bio:
      lang === 'es'
        ? 'Soy estudiante de Ingeniería de Software con experiencia en desarrollo de soluciones tecnológicas y análisis funcional. He colaborado con equipos multidisciplinarios, participando desde el levantamiento de requisitos hasta la implementación de funcionalidades. Busco aportar una visión que combine conocimientos técnicos, comprensión del negocio y mejora continua.'
        : 'I am a Software Engineering student experienced in technology solutions development and functional analysis. I have collaborated with multidisciplinary teams, participating from requirements gathering to feature implementation. I aim to contribute a vision combining technical knowledge, business understanding, and continuous improvement.',
    iconPath:
      'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    image: faridImg,
  },
  {
    id: 'matias-diaz',
    name: 'Matias Sebastian Diaz Quispe',
    code: 'u202311938',
    bio:
      lang === 'es'
        ? 'Soy estudiante de la carrera de Ingeniería de Software, actualmente cursando el 7mo ciclo. Cuento con conocimientos sólidos en desarrollo backend y móvil. Además, me adapto con facilidad y tengo una fuerte ética de trabajo. Poseo conocimientos en Git, TypeScript, React.js, HTML y Tailwind, así como en programación orientada a objetos. También tengo manejo básico de frameworks como Vue y Next.js. Contribuyo al equipo aportando soluciones prácticas y orientadas a resultados.'
        : 'I am a Software Engineering student currently in my 7th semester. I have solid experience in backend and mobile development, high adaptability, and a strong work ethic. I have expertise in Git, TypeScript, React.js, HTML, and Tailwind, as well as object-oriented programming, with working knowledge of Vue and Next.js. I contribute practical, results-driven solutions to the team.',
    iconPath:
      'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    image: matiasImg,
  },
  {
    id: 'nicolas-juarez',
    name: 'Nicolas Emilio Walter Juarez Leon',
    code: 'u202317483',
    bio:
      lang === 'es'
        ? 'Soy estudiante de la carrera de Ingeniería de Software. Mi interés se centra en las áreas de arquitectura de software y el planeamiento y gestión de proyectos de software, las cuales quiero profundizar a futuro y aplicar en los proyectos que participo. Además, he trabajado en equipos multidisciplinarios asumiendo tareas y responsabilidades, comunicando avances con el equipo y brindando ideas para el progreso del proyecto.'
        : 'I am a Software Engineering student focused on software architecture and project management. I aim to deepen these areas and apply them to the projects I participate in. I have worked in multidisciplinary teams taking on responsibilities, communicating progress, and sharing ideas for project advancement.',
    iconPath:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    image: nicolasImg,
  },
  {
    id: 'dayro-rios',
    name: 'Dayro Richard Rios Piñan',
    code: 'u202315283',
    bio:
      lang === 'es'
        ? 'Mi nombre es Dayro Rios, tengo 20 años y actualmente estoy en el octavo ciclo de la carrera de Ingeniería de Software en la Universidad Peruana de Ciencias Aplicadas. Disfruto de escuchar música, jugar videojuegos y practicar deportes. Me considero una persona empática y tengo facilidad para comunicarme en entornos de trabajo en equipo.'
        : 'My name is Dayro Rios, 20 years old, currently in my 8th semester of Software Engineering at Universidad Peruana de Ciencias Aplicadas. I enjoy music, gaming, and sports. I consider myself empathetic and communicate effectively in collaborative team settings.',
    iconPath:
      'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    image: dayroImg,
  },
];

export const TEAM_MEMBERS = getTeamMembers('es');
