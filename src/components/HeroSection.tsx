import { useState } from 'react';
import { ArrowDownRight, Terminal } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../utils/language';

interface HeroSectionProps {
  lang: Language;
}

export function HeroSection({ lang }: HeroSectionProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const t = TRANSLATIONS[lang].hero;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8 lg:pt-20 lg:pb-28"
    >
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: Editorial typography & positioning */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            {/* Clean unboxed location & availability metadata */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-neutral-600 sm:text-[13px] dark:text-neutral-400">
              <span>{PROFILE.location}</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">
                /
              </span>
              <span className="text-[#0F766E] dark:text-[#2DD4BF]">
                {t.availability}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-[clamp(2.5rem,5.2vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#171717] dark:text-[#F5F5F5]"
            >
              {t.headline}
            </h1>

            <p className="mt-5 max-w-2xl font-display text-xl font-medium leading-snug tracking-[-0.015em] text-neutral-800 sm:text-2xl lg:text-[1.65rem] dark:text-neutral-200">
              {t.subheadline}
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
              {t.supporting}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-neutral-200 pt-7 dark:border-neutral-800">
            <a
              href="#projects"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-[2px] bg-[#171717] px-5 py-2.5 text-sm font-medium text-[#FAFAFA] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0F766E] dark:bg-[#F5F5F5] dark:text-[#111111] dark:hover:bg-[#2DD4BF]"
            >
              <span>{t.exploreProjects}</span>
              <ArrowDownRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#playground"
              className="inline-flex min-h-[44px] items-center gap-2 px-1 py-2 text-sm font-medium text-neutral-600 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#171717] dark:text-neutral-400 dark:hover:text-[#F5F5F5]"
            >
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span>{t.developerPlayground}</span>
            </a>
          </div>
        </div>

        {/* Right: Integrated personal photograph */}
        <div className="lg:col-span-5">
          <figure className="mx-auto flex h-full max-w-[360px] flex-col border border-neutral-200 bg-white lg:max-w-none dark:border-neutral-800 dark:bg-[#161616]">
            <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              {!photoFailed ? (
                <img
                  src={PROFILE.portraitPath}
                  alt={t.portraitAlt}
                  width={800}
                  height={1000}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setPhotoFailed(true)}
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out hover:scale-[1.015] dark:brightness-[0.94] dark:contrast-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="font-display text-3xl font-semibold text-neutral-400 dark:text-neutral-600">
                    {PROFILE.displayName}
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    {PROFILE.fullName}
                  </span>
                </div>
              )}
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-neutral-200 px-3.5 py-2.5 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              <span className="truncate font-medium text-[#171717] dark:text-[#F5F5F5]">
                {PROFILE.fullName}
              </span>
              <span className="font-mono shrink-0 text-neutral-500 dark:text-neutral-400">
                {PROFILE.username}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
