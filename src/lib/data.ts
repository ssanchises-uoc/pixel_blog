
export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'mejores-rpg-1995',
    title: 'Top 10 RPGs de 1995',
    excerpt: 'Chrono Trigger, EarthBound y la época dorada del rol japonés en 16 bits.',
    content: `
      <p>1995 fue un año irrepetible para los amantes del RPG. La Super Nintendo estaba en su madurez técnica y los desarrolladores exprimían el hardware al máximo.</p>
      <h3>Chrono Trigger: El rey indiscutible</h3>
      <p>Square reunió al "Dream Team" (Sakaguchi, Horii, Toriyama) para crear una obra maestra atemporal. Los viajes en el tiempo no solo eran una mecánica narrativa, sino una revolución en el gameplay.</p>
      <h3>EarthBound: La rareza necesaria</h3>
      <p>Mientras todos miraban a la fantasía medieval, Shigesato Itoi nos llevó a la américa suburbana moderna. Un juego que rompió la cuarta pared antes de que fuera moda.</p>
      <p>La profundidad emocional de estos títulos sentó las bases de lo que hoy consideramos narrativa en videojuegos. No eran solo juegos, eran experiencias que definieron a una generación.</p>
    `,
    category: 'RETRO REVIEW',
    author: 'Admin',
    date: '29 NOV 2025',
    color: '#FF77A8'
  },
  {
    id: 2,
    slug: 'pixel-art-moderno',
    title: 'Pixel Art en la Era 4K',
    excerpt: 'Cómo los indies mantienen viva la estética de los 90 con tecnología moderna.',
    content: '<p>Contenido de prueba sobre pixel art...</p>',
    category: 'DEV DIARY',
    author: 'PixelArtist',
    date: '28 NOV 2025',
    color: '#6BE0FF'
  },
  {
    id: 3,
    slug: 'musica-chiptune',
    title: 'Sintetizadores y Nostalgia',
    excerpt: 'Analizando la banda sonora de Donkey Kong Country y su impacto ambiental.',
    content: '<p>David Wise hizo magia con el chip de sonido SPC700...</p>',
    category: 'MUSIC',
    author: 'SoundChip',
    date: '25 NOV 2025',
    color: '#58FF7D'
  },
  {
    id: 4,
    slug: 'mario-world-secrets',
    title: 'Secretos de SMW',
    excerpt: 'La Star Road y otros misterios ocultos en el mapa de Dinosaur Land.',
    category: 'GUÍA',
    author: 'Admin',
    date: '20 NOV 2025',
    color: '#F8FF85'
  }
];

export const CATEGORIES = ['ALL', 'RETRO REVIEW', 'DEV DIARY', 'MUSIC', 'GUÍA'];

export const GALLERY_IMAGES = [
  { id: 1, srcId: "gallery-1", title: 'Game Room Setup', desc: 'Estación de batalla retro completa.' },
  { id: 2, srcId: "gallery-2", title: 'Neon Controller', desc: 'Mando personalizado con iluminación mod.' },
  { id: 3, srcId: "gallery-3", title: 'Arcade Corner', desc: 'Rincón arcade clásico.' },
  { id: 4, srcId: "gallery-4", title: 'Handheld Collection', desc: 'Colección de consolas portátiles.' },
  { id: 5, srcId: "gallery-5", title: 'Cartridge Stack', desc: 'Torre de cartuchos de 16 bits.' },
  { id: 6, srcId: "gallery-6", title: 'CRT Display', desc: 'Monitor CRT para scanlines perfectas.' },
];

export const MUSIC_TRACKS = [
  { 
    id: '00', title: 'PIXEL BLASTER', type: 'BGM', duration: '03:26', 
    sound: { type: 'file', path: '/sounds/Pixel_Blaster.mp3' }
  },
  {
    id: '01', title: 'LABYRINTH OF SHADOWS', type: 'BGM', duration: '01:26',
    sound: { type: 'file', path: '/sounds/Labyrinth_Shadows.mp3' }
  },
  { 
    id: '02', title: 'PIXEL RUSH', type: 'SFX', duration: '03:44', 
    sound: { type: 'file', path: '/sounds/Pixel_Rush.mp3' }
  },
  { 
    id: '03', title: 'JUMP', type: 'SFX', duration: '00:01', 
    sound: { type: 'file', path: '/sounds/jump.mp3' }
  },
];

export const ABOUT_DATA = {
  name: 'DEV_PLAYER_1',
  role: 'Code Wizard',
  level: 99,
  bio: 'Desarrollador apasionado por los píxeles y el código limpio. Crecí soplando cartuchos y ahora construyo experiencias web inmersivas. Mis armas principales son React y CSS moderno.',
  skills: [
    { name: 'REACT.JS', level: 90, color: '#FF77A8' },
    { name: 'TAILWIND', level: 95, color: '#6BE0FF' },
    { name: 'NODE.JS', level: 75, color: '#58FF7D' },
    { name: 'PIXEL ART', level: 60, color: '#F8FF85' },
  ],
  inventory: ['VS Code', 'Figma', 'Coffee', 'SNES Controller']
};
