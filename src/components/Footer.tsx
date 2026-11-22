import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../utils/language';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = TRANSLATIONS[lang].footer;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-neutral-600 sm:text-[13px] dark:text-neutral-400">
          <span className="font-display font-semibold text-[#171717] dark:text-[#F5F5F5]">
            {PROFILE.displayName}
          </span>
          <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">
            ·
          </span>
          <span>{PROFILE.location}</span>
          <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">
            ·
          </span>
          <span className="tabular-nums">
            © {currentYear} {PROFILE.fullName}
          </span>
        </div>

        <button
          type="button"
          onClick={handleBackToTop}
          className="group inline-flex w-fit items-center gap-1.5 text-xs font-medium text-neutral-600 whitespace-nowrap transition-colors duration-150 hover:text-[#171717] sm:text-[13px] dark:text-neutral-400 dark:hover:text-[#F5F5F5]"
        >
          <span>{t.backToTop}</span>
          <ArrowUp
            className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </footer>
  );
}
