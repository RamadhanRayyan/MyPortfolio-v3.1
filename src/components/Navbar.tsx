import { Languages, Moon, Sun } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../utils/language';
import type { ThemeMode } from '../utils/theme';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  lang: Language;
  onToggleLanguage: () => void;
}

export function Navbar({
  theme,
  onToggleTheme,
  lang,
  onToggleLanguage,
}: NavbarProps) {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang].nav;

  const navItems = [
    { label: t.about, href: '#about' },
    { label: t.projects, href: '#projects' },
    { label: t.contact, href: '#contact' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-[#FAFAFA] transition-colors duration-200 dark:border-neutral-800 dark:bg-[#111111]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-8 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-[#171717] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-75 dark:text-[#F5F5F5]"
        >
          Rayy
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label={t.ariaLabel}
          className="flex items-center gap-3 sm:gap-7"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-[13px] font-medium text-neutral-600 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#171717] sm:text-sm dark:text-neutral-400 dark:hover:text-[#F5F5F5]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language & theme controls */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            data-testid="language-toggle"
            onClick={onToggleLanguage}
            aria-label={t.switchLanguageAria}
            title={t.switchLanguageAria}
            className="inline-flex h-9 items-center gap-1.5 rounded-[2px] border border-neutral-200 bg-white px-2 font-mono text-[11px] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-neutral-400 sm:px-2.5 sm:text-xs dark:border-neutral-800 dark:bg-[#171717] dark:hover:border-neutral-600"
          >
            <Languages
              className="hidden h-3.5 w-3.5 text-neutral-500 sm:inline dark:text-neutral-400"
              aria-hidden="true"
            />
            <span
              className={
                lang === 'en'
                  ? 'font-semibold text-[#0F766E] dark:text-[#2DD4BF]'
                  : 'text-neutral-400 dark:text-neutral-500'
              }
            >
              EN
            </span>
            <span
              aria-hidden="true"
              className="text-neutral-300 dark:text-neutral-700"
            >
              /
            </span>
            <span
              className={
                lang === 'id'
                  ? 'font-semibold text-[#0F766E] dark:text-[#2DD4BF]'
                  : 'text-neutral-400 dark:text-neutral-500'
              }
            >
              ID
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? t.switchToLight : t.switchToDark}
            aria-pressed={isDark}
            className="inline-flex h-9 items-center gap-2 rounded-[2px] border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-700 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-neutral-400 hover:text-[#171717] sm:px-3 dark:border-neutral-800 dark:bg-[#171717] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-[#F5F5F5]"
          >
            {isDark ? (
              <Sun className="h-3.5 w-3.5 text-[#2DD4BF]" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">
              {isDark ? t.lightLabel : t.darkLabel}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
