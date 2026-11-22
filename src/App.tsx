import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { DeveloperPlayground } from './components/DeveloperPlayground';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { TRANSLATIONS } from './data/translations';
import {
  applyLanguageToDocument,
  getNextLanguage,
  readStoredLanguage,
  resolveInitialLanguage,
  saveStoredLanguage,
  type Language,
} from './utils/language';
import {
  applyThemeToDocument,
  getNextTheme,
  readStoredTheme,
  resolveInitialTheme,
  saveStoredTheme,
  type ThemeMode,
} from './utils/theme';

function getInitialThemeState(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const stored = readStoredTheme();
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return resolveInitialTheme(stored, systemPrefersDark);
}

function getInitialLanguageState(): Language {
  if (typeof window === 'undefined') return 'en';
  return resolveInitialLanguage(readStoredLanguage());
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialThemeState);
  const [lang, setLang] = useState<Language>(getInitialLanguageState);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    applyLanguageToDocument(lang);
  }, [lang]);

  // Follow system theme changes only if the user has not explicitly saved a preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (!readStoredTheme()) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = getNextTheme(prev);
      saveStoredTheme(next);
      return next;
    });
  };

  const handleToggleLanguage = () => {
    setLang((prev) => {
      const next = getNextLanguage(prev);
      saveStoredLanguage(next);
      return next;
    });
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] transition-colors duration-200 dark:bg-[#111111] dark:text-[#F5F5F5]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[2px] focus:bg-[#171717] focus:px-3 focus:py-2 focus:text-xs focus:font-medium focus:text-[#FAFAFA] dark:focus:bg-[#F5F5F5] dark:focus:text-[#111111]"
      >
        {t.skipToContent}
      </a>

      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
      />

      <main id="main-content">
        <HeroSection lang={lang} />
        <AboutSection lang={lang} />
        <ProjectsSection lang={lang} />
        <DeveloperPlayground lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
