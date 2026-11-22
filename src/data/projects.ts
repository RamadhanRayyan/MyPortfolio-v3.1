import type { GallerySlide } from '../utils/gallery';

export interface ProjectItem {
  number: string;
  slug: string;
  name: string;
  category: string;
  stack: readonly string[];
  shortDescription: string;
  detailNote: string;
  /**
   * Public live URL. Set to `null` for private/local builds until deployed;
   * replacing `null` with an `https://...` URL immediately makes the card
   * link directly to the live site in a new tab.
   */
  url: string | null;
  urlLabel: string;
  /**
   * Primary card thumbnail (mobile showcase poster for live sites, or `null`
   * when no screenshot exists yet).
   */
  previewImage: string | null;
  previewAlt: string;
  /**
   * E-commerce style overview slides shown when clicking a project thumbnail
   * (mobile poster + desktop overview screenshots).
   */
  gallery: readonly GallerySlide[];
}

/**
 * Configurable URL placeholders for projects without a public URL yet.
 * Replace `null` with a deployed URL string whenever ready.
 */
export const CONFIGURABLE_PROJECT_URLS = {
  pos: null as string | null,
  nutricare: null as string | null,
};

/**
 * Selected Projects — exact order (01 to 08) must be preserved.
 */
export const PROJECTS: readonly ProjectItem[] = [
  {
    number: '01',
    slug: 'pos',
    name: 'POS',
    category: 'Business System',
    stack: ['React', 'Vite', 'Supabase', 'SQL'],
    shortDescription:
      'Store point-of-sale system with real-time stock alerts and daily sales reporting.',
    detailNote:
      'Internal point-of-sale web system built for store operations, tracking gross sales, transactions, and low-stock items in real time.',
    url: CONFIGURABLE_PROJECT_URLS.pos,
    urlLabel: 'Private deployment',
    previewImage: '/src/assets/images/projects/01-pos-poster.jpg',
    previewAlt: 'POS business summary dashboard poster preview',
    gallery: [
      {
        src: '/src/assets/images/projects/01-pos-poster.jpg',
        alt: 'POS framed dashboard showcase poster',
        label: 'Showcase Poster',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/01-pos.jpg',
        alt: 'POS desktop business summary dashboard showing sales metrics and stock alerts',
        label: 'Desktop — Dashboard',
        viewport: 'desktop',
      },
    ],
  },
  {
    number: '02',
    slug: 'nutricare',
    name: 'NutriCare',
    category: 'Health Platform',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    shortDescription:
      'Nutrition and care web app for structured daily health tracking.',
    detailNote:
      'Web application designed around practical nutrition tracking and health management. Public URL can be linked directly once deployed.',
    url: CONFIGURABLE_PROJECT_URLS.nutricare,
    urlLabel: 'Private deployment',
    previewImage: null,
    previewAlt: 'NutriCare project visual identity',
    gallery: [],
  },
  {
    number: '03',
    slug: '29-official-store',
    name: '29 Official Store',
    category: 'E-Commerce',
    stack: ['React', 'Tailwind CSS', 'Vite', 'Supabase'],
    shortDescription:
      'Custom fragrance store for exploring collections and crafting personal scents.',
    detailNote:
      'Online storefront for 29 Racik Aroma Sesukamu in Semarang, featuring custom aroma blending flows, catalog browsing, and order tracking.',
    url: 'https://29officialstoore.com/',
    urlLabel: '29officialstoore.com',
    previewImage: '/src/assets/images/projects/03-29officialstore-poster.jpg',
    previewAlt: '29 Official Store mobile showcase poster',
    gallery: [
      {
        src: '/src/assets/images/projects/03-29officialstore-poster.jpg',
        alt: '29 Official Store dual mobile screens showcase',
        label: 'Mobile Showcase',
        viewport: 'mobile',
      },
      {
        src: '/src/assets/images/projects/03-29officialstore-ready.jpg',
        alt: '29 Official Store desktop hero view featuring Racik Aroma Sesukamu',
        label: 'Desktop — Hero',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/03-29officialstore-desktop-2.jpg',
        alt: '29 Official Store desktop brand story and aroma collection overview',
        label: 'Desktop — Story',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/03-29officialstore-desktop-3.jpg',
        alt: '29 Official Store desktop published inspirations and store details',
        label: 'Desktop — Catalog',
        viewport: 'desktop',
      },
    ],
  },
  {
    number: '04',
    slug: 'omah-maduku',
    name: 'Omah Maduku',
    category: 'Brand Storefront',
    stack: ['React', 'Vite', 'Supabase', 'SQL'],
    shortDescription:
      'Natural honey storefront showcasing pure variants, sourcing, and direct orders.',
    detailNote:
      'Product landing page and catalog for Omah Maduku, presenting pure honey variants, harvesting process, and customer ordering channels.',
    url: 'https://omahmaduku.netlify.app/',
    urlLabel: 'omahmaduku.netlify.app',
    previewImage: '/src/assets/images/projects/04-omahmaduku-poster.jpg',
    previewAlt: 'Omah Maduku mobile showcase poster',
    gallery: [
      {
        src: '/src/assets/images/projects/04-omahmaduku-poster.jpg',
        alt: 'Omah Maduku dual mobile screens showcase',
        label: 'Mobile Showcase',
        viewport: 'mobile',
      },
      {
        src: '/src/assets/images/projects/04-omahmaduku.jpg',
        alt: 'Omah Maduku desktop homepage hero view',
        label: 'Desktop — Hero',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/04-omahmaduku-desktop-2.jpg',
        alt: 'Omah Maduku desktop brand introduction and honey highlights',
        label: 'Desktop — Process',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/04-omahmaduku-desktop-3.jpg',
        alt: 'Omah Maduku desktop vision, mission, and contact overview',
        label: 'Desktop — Details',
        viewport: 'desktop',
      },
    ],
  },
  {
    number: '05',
    slug: 'aura-medistra',
    name: 'Aura Medistra',
    category: 'Company Profile',
    stack: ['React', 'Tailwind CSS', 'Vite'],
    shortDescription:
      'Corporate web profile and catalog for medical distributor PT. Aura Medistra.',
    detailNote:
      'Company profile web presence built for PT. Aura Medistra Indonesia to showcase medical device distribution, gallery, and contact channels.',
    url: 'https://auramedistra.my.id/',
    urlLabel: 'auramedistra.my.id',
    previewImage: '/src/assets/images/projects/05-auramedistra-poster.jpg',
    previewAlt: 'Aura Medistra Indonesia mobile showcase poster',
    gallery: [
      {
        src: '/src/assets/images/projects/05-auramedistra-poster.jpg',
        alt: 'Aura Medistra dual mobile screens showcase',
        label: 'Mobile Showcase',
        viewport: 'mobile',
      },
      {
        src: '/src/assets/images/projects/05-auramedistra.jpg',
        alt: 'Aura Medistra desktop hero section',
        label: 'Desktop — Hero',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/05-auramedistra-desktop-2.jpg',
        alt: 'Aura Medistra desktop company overview and products section',
        label: 'Desktop — Profile',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/05-auramedistra-desktop-3.jpg',
        alt: 'Aura Medistra desktop gallery and corporate information section',
        label: 'Desktop — Gallery',
        viewport: 'desktop',
      },
    ],
  },
  {
    number: '06',
    slug: 'prh-project',
    name: 'PRH Project',
    category: 'Environmental Tech',
    stack: ['React', 'Vite', 'Supabase', 'SQL'],
    shortDescription:
      'Company profile and booklet portal for horizontal infiltration pipe systems.',
    detailNote:
      'Web platform for Pipa Resapan Horisontal (PRH) presenting groundwater conservation systems, technical booklets, project archive, and consultation.',
    url: 'https://prhproject.netlify.app/',
    urlLabel: 'prhproject.netlify.app',
    previewImage: '/src/assets/images/projects/06-prhproject-poster.jpg',
    previewAlt: 'PRH Project mobile showcase poster',
    gallery: [
      {
        src: '/src/assets/images/projects/06-prhproject-poster.jpg',
        alt: 'PRH Project dual mobile screens showcase',
        label: 'Mobile Showcase',
        viewport: 'mobile',
      },
      {
        src: '/src/assets/images/projects/06-prhproject.jpg',
        alt: 'PRH Project desktop hero section for Pipa Resapan Horisontal',
        label: 'Desktop — Hero',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/06-prhproject-desktop-2.jpg',
        alt: 'PRH Project desktop benefits and technical product overview',
        label: 'Desktop — Overview',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/06-prhproject-desktop-3.jpg',
        alt: 'PRH Project desktop installations and publication details',
        label: 'Desktop — Projects',
        viewport: 'desktop',
      },
    ],
  },
  {
    number: '07',
    slug: 'ramadhan-portals',
    name: 'Ramadhan Portals',
    category: 'Digital Portal',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    shortDescription:
      'Worship navigation portal with city imsakiyah schedules and daily supplications.',
    detailNote:
      'Structured digital portal built to accompany daily Ramadhan worship with city prayer schedules, doa collections, and curated articles.',
    url: 'https://ramadhanportals.netlify.app/',
    urlLabel: 'ramadhanportals.netlify.app',
    previewImage: '/src/assets/images/projects/07-ramadhanportals-poster.jpg',
    previewAlt: 'Ramadhan Portals mobile showcase poster',
    gallery: [
      {
        src: '/src/assets/images/projects/07-ramadhanportals-poster.jpg',
        alt: 'Ramadhan Portals dual mobile screens showcase',
        label: 'Mobile Showcase',
        viewport: 'mobile',
      },
      {
        src: '/src/assets/images/projects/07-ramadhanportals.jpg',
        alt: 'Ramadhan Portals desktop hero homepage',
        label: 'Desktop — Hero',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/07-ramadhanportals-desktop-2.jpg',
        alt: 'Ramadhan Portals desktop worship navigation modules',
        label: 'Desktop — Modules',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/07-ramadhanportals-desktop-3.jpg',
        alt: 'Ramadhan Portals desktop schedules and resources section',
        label: 'Desktop — Features',
        viewport: 'desktop',
      },
    ],
  },
  {
    number: '08',
    slug: 'renstra-web',
    name: 'Renstra Web',
    category: 'Monitoring Dashboard',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    shortDescription:
      'Strategic plan dashboard tracking 2026–2030 indicators and annual progress.',
    detailNote:
      'Dashboard application for monitoring Rencana Strategis (Renstra) 2026–2030 metrics, multi-year progress visualization, and PDF report export.',
    url: 'https://renstraweb.netlify.app/',
    urlLabel: 'renstraweb.netlify.app',
    previewImage: '/src/assets/images/projects/08-renstraweb-poster.jpg',
    previewAlt: 'Renstra Web mobile showcase poster',
    gallery: [
      {
        src: '/src/assets/images/projects/08-renstraweb-poster.jpg',
        alt: 'Renstra Web dual mobile screens showcase',
        label: 'Mobile Showcase',
        viewport: 'mobile',
      },
      {
        src: '/src/assets/images/projects/08-renstraweb.jpg',
        alt: 'Renstra Web desktop monitoring dashboard overview',
        label: 'Desktop — Dashboard',
        viewport: 'desktop',
      },
      {
        src: '/src/assets/images/projects/08-renstraweb-desktop-2.jpg',
        alt: 'Renstra Web desktop indicator breakdowns and charts',
        label: 'Desktop — Indicators',
        viewport: 'desktop',
      },
    ],
  },
];
