import type { Language } from '../utils/language';
import type { ProjectItem } from './projects';

export interface SiteTranslation {
  skipToContent: string;
  nav: {
    ariaLabel: string;
    about: string;
    projects: string;
    contact: string;
    switchToLight: string;
    switchToDark: string;
    lightLabel: string;
    darkLabel: string;
    switchLanguageAria: string;
  };
  hero: {
    availability: string;
    headline: string;
    subheadline: string;
    supporting: string;
    positioning: string;
    exploreProjects: string;
    developerPlayground: string;
    portraitAlt: string;
  };
  about: {
    heading: string;
    primary: string;
    secondary: string;
    stackHeading: string;
    stackAriaLabel: string;
    toolsSuffix: string;
  };
  projects: {
    heading: string;
    subtitle: string;
    metaSummary: string;
    privateDeployment: string;
    privateWebBuild: string;
    clickForDesktopOverview: string;
    clickForDetails: string;
    stackButton: string;
    hideButton: string;
    openGalleryAria: (number: string, name: string) => string;
    openLiveAria: (number: string, name: string, category: string) => string;
    viewDetailsAria: (number: string, name: string, category: string) => string;
    toggleStackAria: (isRevealed: boolean, name: string) => string;
  };
  gallery: {
    closeAria: string;
    prevAria: string;
    nextAria: string;
    slidesTablistAria: string;
    viewSlideAria: (index: number, label: string) => string;
    keyboardHint: string;
    privateNotice: string;
    stackLabel: string;
    visitWebsite: string;
    requestDemo: string;
    close: string;
  };
  playground: {
    heading: string;
    description: string;
    tip: string;
    clearAria: string;
    clearLabel: string;
    outputAria: string;
    clearedPrefix: string;
    clearedSuffix: string;
    inputAria: string;
    placeholder: string;
    runAria: string;
    runLabel: string;
    quickCommandsAria: string;
    commandsLabel: string;
  };
  contact: {
    heading: string;
    description: string;
    copyEmailAria: string;
    copy: string;
    copied: string;
    formTitle: string;
    formDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    errorMessage: string;
  };
  footer: {
    backToTop: string;
  };
}

export const TRANSLATIONS: Record<Language, SiteTranslation> = {
  en: {
    skipToContent: 'Skip to content',
    nav: {
      ariaLabel: 'Primary navigation',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      lightLabel: 'Light',
      darkLabel: 'Dark',
      switchLanguageAria: 'Switch language to Indonesian',
    },
    hero: {
      availability: 'Available for collaborations & product builds',
      headline: "Hi, I'm Rayy.",
      subheadline:
        'Fullstack Vibe Developer building digital products that solve real problems.',
      supporting:
        'From ideas to functional websites, business systems, and digital experiences.',
      positioning: 'I turn ideas into real digital products.',
      exploreProjects: 'Explore Projects',
      developerPlayground: 'Developer Playground',
      portraitAlt:
        'Muhammad Ramadhan Rayyan (Rayy), Fullstack Vibe Developer in Semarang, Indonesia',
    },
    about: {
      heading: 'About',
      primary:
        "I'm a student and developer interested in programming, product development, and modern web technologies. I enjoy transforming ideas into useful digital products, from business systems to interactive web platforms.",
      secondary:
        'Currently studying software engineering at NUSA Boarding School in Semarang, I focus on shipping dependable web applications where clear structure, practical utility, and thoughtful design work together.',
      stackHeading: 'Technology Stack',
      stackAriaLabel: 'Core technology stack',
      toolsSuffix: 'tools',
    },
    projects: {
      heading: 'Selected Projects',
      subtitle:
        'Click any project preview to browse desktop overview slides, or open the live site directly.',
      metaSummary: 'Mobile posters & desktop gallery',
      privateDeployment: 'Private deployment',
      privateWebBuild: 'Private web build',
      clickForDesktopOverview: 'Click image for desktop overview',
      clickForDetails: 'Click image for details',
      stackButton: 'Stack',
      hideButton: 'Hide',
      openGalleryAria: (number, name) =>
        `Open image gallery overview for ${number}. ${name}`,
      openLiveAria: (number, name, category) =>
        `${number}. ${name} — ${category} (opens live website in a new tab)`,
      viewDetailsAria: (number, name, category) =>
        `${number}. ${name} — ${category} (view project details)`,
      toggleStackAria: (isRevealed, name) =>
        `${isRevealed ? 'Hide' : 'Show'} stack and category for ${name}`,
    },
    gallery: {
      closeAria: 'Close project gallery',
      prevAria: 'Previous overview image',
      nextAria: 'Next overview image',
      slidesTablistAria: 'Project overview slides',
      viewSlideAria: (index, label) => `View slide ${index}: ${label}`,
      keyboardHint: 'Use arrow keys or click thumbnail',
      privateNotice:
        'Private build — live screenshots will appear here once deployed.',
      stackLabel: 'Stack:',
      visitWebsite: 'Visit Website',
      requestDemo: 'Request Demo',
      close: 'Close',
    },
    playground: {
      heading: 'Developer Playground',
      description:
        'A lightweight command interface to inspect my profile, stack, projects, and links directly from the keyboard—or tap any command below.',
      tip: 'Tip: Press Tab to autocomplete, or Up/Down arrows for history.',
      clearAria: 'Clear terminal output',
      clearLabel: 'Clear',
      outputAria: 'Terminal output',
      clearedPrefix: 'Terminal cleared. Type',
      clearedSuffix: 'or select a command below.',
      inputAria: 'Enter terminal command',
      placeholder: 'Type help, about, projects, stack, or contact',
      runAria: 'Run command',
      runLabel: 'Run',
      quickCommandsAria: 'Quick terminal commands',
      commandsLabel: 'Commands:',
    },
    contact: {
      heading: "Have an idea? Let's build it.",
      description:
        'Open to websites, business systems, custom dashboards, and meaningful collaborations. Reach out directly through any channel here, or send a message below.',
      copyEmailAria: 'Copy email address',
      copy: 'Copy',
      copied: 'Copied',
      formTitle: 'Send a Message',
      formDescription: 'Have a project in mind or want to collaborate? Leave a message below.',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Alex Pratama',
      emailLabel: 'Email Address',
      emailPlaceholder: 'alex@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about your project, idea, or questions...',
      submitButton: 'Send Message',
      submittingButton: 'Sending...',
      successTitle: 'Message sent!',
      successMessage: 'Thank you for reaching out. I will get back to you as soon as possible.',
      sendAnother: 'Send another message',
      errorMessage: 'Failed to send message. Please try again or reach out via direct email.',
    },
    footer: {
      backToTop: 'Back to top',
    },
  },
  id: {
    skipToContent: 'Lewati ke konten utama',
    nav: {
      ariaLabel: 'Navigasi utama',
      about: 'Tentang',
      projects: 'Proyek',
      contact: 'Kontak',
      switchToLight: 'Beralih ke mode terang',
      switchToDark: 'Beralih ke mode gelap',
      lightLabel: 'Terang',
      darkLabel: 'Gelap',
      switchLanguageAria: 'Switch language to English',
    },
    hero: {
      availability: 'Tersedia untuk kolaborasi & pembuatan produk',
      headline: 'Halo, saya Rayy.',
      subheadline:
        'Fullstack Vibe Developer yang membangun produk digital untuk menyelesaikan masalah nyata.',
      supporting:
        'Dari ide menjadi website fungsional, sistem bisnis, dan pengalaman digital.',
      positioning: 'Saya mengubah ide menjadi produk digital nyata.',
      exploreProjects: 'Lihat Proyek',
      developerPlayground: 'Terminal Developer',
      portraitAlt:
        'Muhammad Ramadhan Rayyan (Rayy), Fullstack Vibe Developer di Semarang, Indonesia',
    },
    about: {
      heading: 'Tentang',
      primary:
        'Saya seorang pelajar dan developer yang tertarik pada pemrograman, pengembangan produk, dan teknologi web modern. Saya senang mengubah ide menjadi produk digital yang bermanfaat, mulai dari sistem bisnis hingga platform web interaktif.',
      secondary:
        'Saat ini saya belajar rekayasa perangkat lunak di NUSA Boarding School, Semarang, dengan fokus membangun aplikasi web yang andal di mana struktur yang jelas, fungsi praktis, dan desain yang terukur saling melengkapi.',
      stackHeading: 'Teknologi Utama',
      stackAriaLabel: 'Daftar teknologi utama',
      toolsSuffix: 'teknologi',
    },
    projects: {
      heading: 'Proyek Pilihan',
      subtitle:
        'Klik pratinjau proyek mana pun untuk melihat slide tampilan desktop, atau buka langsung situs live-nya.',
      metaSummary: 'Poster mobile & galeri desktop',
      privateDeployment: 'Deployment privat',
      privateWebBuild: 'Build web privat',
      clickForDesktopOverview: 'Klik gambar untuk overview desktop',
      clickForDetails: 'Klik gambar untuk detail',
      stackButton: 'Stack',
      hideButton: 'Tutup',
      openGalleryAria: (number, name) =>
        `Buka galeri overview gambar untuk ${number}. ${name}`,
      openLiveAria: (number, name, category) =>
        `${number}. ${name} — ${category} (buka situs live di tab baru)`,
      viewDetailsAria: (number, name, category) =>
        `${number}. ${name} — ${category} (lihat detail proyek)`,
      toggleStackAria: (isRevealed, name) =>
        `${isRevealed ? 'Sembunyikan' : 'Tampilkan'} stack dan kategori untuk ${name}`,
    },
    gallery: {
      closeAria: 'Tutup galeri proyek',
      prevAria: 'Gambar overview sebelumnya',
      nextAria: 'Gambar overview berikutnya',
      slidesTablistAria: 'Slide overview proyek',
      viewSlideAria: (index, label) => `Lihat slide ${index}: ${label}`,
      keyboardHint: 'Gunakan tombol panah atau klik thumbnail',
      privateNotice:
        'Build privat — tangkapan layar live akan tampil di sini setelah di-deploy.',
      stackLabel: 'Stack:',
      visitWebsite: 'Kunjungi Situs',
      requestDemo: 'Minta Demo',
      close: 'Tutup',
    },
    playground: {
      heading: 'Terminal Developer',
      description:
        'Antarmuka perintah ringan untuk melihat profil, tech stack, proyek, dan kontak langsung dari keyboard—atau klik perintah di bawah.',
      tip: 'Tip: Tekan Tab untuk melengkapi otomatis, atau panah Atas/Bawah untuk riwayat.',
      clearAria: 'Bersihkan output terminal',
      clearLabel: 'Bersihkan',
      outputAria: 'Output terminal',
      clearedPrefix: 'Terminal dibersihkan. Ketik',
      clearedSuffix: 'atau pilih perintah di bawah.',
      inputAria: 'Masukkan perintah terminal',
      placeholder: 'Ketik help, about, projects, stack, atau contact',
      runAria: 'Jalankan perintah',
      runLabel: 'Jalankan',
      quickCommandsAria: 'Perintah cepat terminal',
      commandsLabel: 'Perintah:',
    },
    contact: {
      heading: 'Punya ide? Mari kita bangun.',
      description:
        'Terbuka untuk pembuatan website, sistem bisnis, dasbor kustom, dan kolaborasi bermakna. Hubungi langsung melalui saluran di sini, atau kirim pesan melalui formulir di bawah.',
      copyEmailAria: 'Salin alamat email',
      copy: 'Salin',
      copied: 'Tersalin',
      formTitle: 'Kirim Pesan',
      formDescription: 'Ada ide proyek atau ingin berdiskusi? Tinggalkan pesan di bawah ini.',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'contoh: Alex Pratama',
      emailLabel: 'Alamat Email',
      emailPlaceholder: 'alex@example.com',
      messageLabel: 'Isi Pesan',
      messagePlaceholder: 'Ceritakan tentang kebutuhan proyek, perkiraan waktu, atau ide Anda...',
      submitButton: 'Kirim Pesan',
      submittingButton: 'Mengirim...',
      successTitle: 'Pesan berhasil terkirim!',
      successMessage: 'Terima kasih telah menghubungi. Saya akan membalas pesan Anda sesegera mungkin.',
      sendAnother: 'Kirim pesan lain',
      errorMessage: 'Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung.',
    },
    footer: {
      backToTop: 'Kembali ke atas',
    },
  },
};

interface LocalizedProjectCopy {
  category: string;
  shortDescription: string;
  detailNote: string;
}

const INDONESIAN_PROJECT_COPY: Record<string, LocalizedProjectCopy> = {
  pos: {
    category: 'Sistem Bisnis',
    shortDescription:
      'Sistem kasir toko dengan peringatan stok real-time dan laporan penjualan harian.',
    detailNote:
      'Sistem web point-of-sale internal untuk operasional toko, melacak penjualan kotor, transaksi, dan stok menipis secara real-time.',
  },
  nutricare: {
    category: 'Platform Kesehatan',
    shortDescription:
      'Aplikasi web nutrisi dan perawatan untuk pemantauan kesehatan harian terstruktur.',
    detailNote:
      'Aplikasi web yang dirancang untuk pencatatan nutrisi praktis dan pengelolaan kesehatan. URL publik dapat ditautkan langsung setelah di-deploy.',
  },
  '29-official-store': {
    category: 'E-Commerce',
    shortDescription:
      'Toko parfum kustom untuk menjelajahi koleksi dan meracik aroma personal.',
    detailNote:
      'Toko online untuk 29 Racik Aroma Sesukamu di Semarang, dilengkapi alur racik parfum kustom, katalog inspirasi, dan pelacakan pesanan.',
  },
  'omah-maduku': {
    category: 'Etalase Brand',
    shortDescription:
      'Website madu alami yang menampilkan varian murni, asal panen, dan pemesanan langsung.',
    detailNote:
      'Landing page produk dan katalog untuk Omah Maduku, menyajikan varian madu murni, proses panen, dan kanal pemesanan pelanggan.',
  },
  'aura-medistra': {
    category: 'Profil Perusahaan',
    shortDescription:
      'Profil perusahaan dan katalog web untuk distributor alat kesehatan PT. Aura Medistra.',
    detailNote:
      'Website company profile PT. Aura Medistra Indonesia untuk menampilkan distribusi alat kesehatan, galeri kegiatan, dan informasi kontak.',
  },
  'prh-project': {
    category: 'Teknologi Lingkungan',
    shortDescription:
      'Profil perusahaan dan portal buklet untuk sistem pipa resapan horisontal.',
    detailNote:
      'Platform web Pipa Resapan Horisontal (PRH) yang menyajikan sistem konservasi air tanah, buklet teknis, arsip proyek, dan konsultasi.',
  },
  'ramadhan-portals': {
    category: 'Portal Digital',
    shortDescription:
      'Portal navigasi ibadah dengan jadwal imsakiyah per kota dan kumpulan doa harian.',
    detailNote:
      'Portal digital terstruktur untuk menemani ibadah Ramadhan harian dengan jadwal sholat per kota, kumpulan doa, dan artikel pilihan.',
  },
  'renstra-web': {
    category: 'Dasbor Monitoring',
    shortDescription:
      'Dasbor rencana strategis yang memantau indikator 2026–2030 dan progres tahunan.',
    detailNote:
      'Aplikasi dasbor untuk memantau indikator Rencana Strategis (Renstra) 2026–2030, visualisasi capaian tahunan, dan ekspor laporan PDF.',
  },
};

const INDONESIAN_SLIDE_LABELS: Record<string, string> = {
  'Showcase Poster': 'Poster Tampilan',
  'Mobile Showcase': 'Tampilan Mobile',
  'Desktop — Hero': 'Desktop — Beranda',
  'Desktop — Dashboard': 'Desktop — Dasbor',
  'Desktop — Story': 'Desktop — Cerita',
  'Desktop — Catalog': 'Desktop — Katalog',
  'Desktop — Process': 'Desktop — Proses',
  'Desktop — Details': 'Desktop — Detail',
  'Desktop — Profile': 'Desktop — Profil',
  'Desktop — Gallery': 'Desktop — Galeri',
  'Desktop — Overview': 'Desktop — Ringkasan',
  'Desktop — Projects': 'Desktop — Proyek',
  'Desktop — Modules': 'Desktop — Modul',
  'Desktop — Features': 'Desktop — Fitur',
  'Desktop — Indicators': 'Desktop — Indikator',
};

export function getProjectCopy(
  project: ProjectItem,
  lang: Language,
): LocalizedProjectCopy {
  if (lang === 'id') {
    const localized = INDONESIAN_PROJECT_COPY[project.slug];
    if (localized) return localized;
  }
  return {
    category: project.category,
    shortDescription: project.shortDescription,
    detailNote: project.detailNote,
  };
}

export function getSlideLabel(label: string, lang: Language): string {
  if (lang === 'id') {
    return INDONESIAN_SLIDE_LABELS[label] ?? label;
  }
  return label;
}
