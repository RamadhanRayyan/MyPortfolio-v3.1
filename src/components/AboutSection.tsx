import { PROFILE, TECH_STACK } from '../data/profile';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../utils/language';

interface AboutSectionProps {
  lang: Language;
}

export function AboutSection({ lang }: AboutSectionProps) {
  const t = TRANSLATIONS[lang].about;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-14 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Section title */}
          <div className="lg:col-span-4">
            <h2
              id="about-heading"
              className="font-display text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#F5F5F5]"
            >
              {t.heading}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {PROFILE.role} · {PROFILE.location}
            </p>
          </div>

          {/* Right column: Narrative + compact tech stack */}
          <div className="lg:col-span-8">
            <p className="max-w-2xl text-base leading-[1.7] text-[#171717] sm:text-[17px] dark:text-[#F5F5F5]">
              {t.primary}
            </p>

            <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-neutral-600 dark:text-neutral-400">
              {t.secondary}
            </p>

            <div className="mt-10 border-t border-neutral-200 pt-7 dark:border-neutral-800">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">
                  {t.stackHeading}
                </h3>
                <span className="font-mono text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
                  {TECH_STACK.length} {t.toolsSuffix}
                </span>
              </div>

              <ul
                aria-label={t.stackAriaLabel}
                className="mt-4 grid grid-cols-2 border-t border-l border-neutral-200 sm:grid-cols-4 dark:border-neutral-800"
              >
                {TECH_STACK.map((tech, index) => (
                  <li
                    key={tech}
                    className="flex items-center justify-between gap-2 border-r border-b border-neutral-200 bg-white/60 px-3.5 py-2.5 text-sm text-neutral-800 dark:border-neutral-800 dark:bg-[#151515] dark:text-neutral-200"
                  >
                    <span className="font-medium whitespace-nowrap">{tech}</span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] tabular-nums text-neutral-400 dark:text-neutral-600"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
