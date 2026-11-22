export interface ContactLink {
  id: 'github' | 'instagram' | 'email';
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

export const PROFILE = {
  fullName: 'Muhammad Ramadhan Rayyan',
  displayName: 'Rayy',
  username: '@raymn',
  role: 'Fullstack Vibe Developer',
  location: 'Semarang, Indonesia',
  availability: 'Available for collaborations & product builds',
  positioning: 'I turn ideas into real digital products.',
  heroHeadline: "Hi, I'm Rayy.",
  heroSubheadline:
    'Fullstack Vibe Developer building digital products that solve real problems.',
  heroSupporting:
    'From ideas to functional websites, business systems, and digital experiences.',
  aboutPrimary:
    "I'm a student and developer interested in programming, product development, and modern web technologies. I enjoy transforming ideas into useful digital products, from business systems to interactive web platforms.",
  aboutSecondary:
    'Currently studying software engineering at NUSA Boarding School in Semarang, I focus on shipping dependable web applications where clear structure, practical utility, and thoughtful design work together.',
  portraitPath: '/src/assets/images/rayy-portrait.jpg',
  portraitAlt: 'Muhammad Ramadhan Rayyan (Rayy), Fullstack Vibe Developer in Semarang, Indonesia',
} as const;

export const TECH_STACK: readonly string[] = [
  'React',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'SQL',
  'Supabase',
  'Git',
  'Vite',
];

export const CONTACT_LINKS: readonly ContactLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@RamadhanRayyan',
    href: 'https://github.com/RamadhanRayyan',
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@rayy.programmer',
    href: 'https://www.instagram.com/rayy.programmer',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'muhammadramadhanrayyan@gmail.com',
    href: 'mailto:muhammadramadhanrayyan@gmail.com',
    external: false,
  },
];
