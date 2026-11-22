import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { CONTACT_LINKS } from '../data/profile';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../utils/language';

interface ContactSectionProps {
  lang: Language;
}

export function ContactSection({ lang }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const t = TRANSLATIONS[lang].contact;

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback if clipboard API is unavailable
      setCopiedEmail(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-14 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2
              id="contact-heading"
              className="font-display text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl dark:text-[#F5F5F5]"
            >
              {t.heading}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t.description}
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              {CONTACT_LINKS.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-4 sm:py-5"
                >
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="group flex min-w-0 flex-1 items-baseline justify-between gap-4 sm:items-center"
                  >
                    <span className="w-24 shrink-0 text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
                      {item.label}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-display text-base font-medium text-[#171717] transition-colors duration-150 group-hover:text-[#0F766E] sm:text-lg dark:text-[#F5F5F5] dark:group-hover:text-[#2DD4BF]">
                      {item.handle}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0F766E] dark:text-neutral-500 dark:group-hover:text-[#2DD4BF]"
                      aria-hidden="true"
                    />
                  </a>

                  {item.id === 'email' && (
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(item.handle)}
                      aria-label={t.copyEmailAria}
                      className="inline-flex h-8 items-center gap-1.5 rounded-[2px] border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-700 whitespace-nowrap shrink-0 transition-colors hover:border-neutral-400 hover:text-[#171717] dark:border-neutral-800 dark:bg-[#161616] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-[#F5F5F5]"
                    >
                      {copiedEmail ? (
                        <>
                          <Check
                            className="h-3.5 w-3.5 text-[#0F766E] dark:text-[#2DD4BF]"
                            aria-hidden="true"
                          />
                          <span>{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{t.copy}</span>
                        </>
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
