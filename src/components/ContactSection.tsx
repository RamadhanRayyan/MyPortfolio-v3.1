import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowUpRight, Check, Copy, Loader2, Send } from 'lucide-react';
import { CONTACT_LINKS } from '../data/profile';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../utils/language';

interface ContactSectionProps {
  lang: Language;
}

export function ContactSection({ lang }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const t = TRANSLATIONS[lang].contact;

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  // Web3Forms API: Handle contact form submission directly to email
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Web3Forms access key loaded from .env
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus('error');
      setErrorMessage(
        lang === 'id'
          ? 'Kunci akses Web3Forms belum diatur. Harap masukkan VITE_WEB3FORMS_ACCESS_KEY di file .env.'
          : 'Web3Forms access key is not configured. Please set VITE_WEB3FORMS_ACCESS_KEY in your .env file.',
      );
      return;
    }

    try {
      // Web3Forms API: POST request to submit message
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio message from ${formData.name}`,
          from_name: `${formData.name} (Portfolio)`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || t.errorMessage);
      }
    } catch {
      setStatus('error');
      setErrorMessage(t.errorMessage);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-14 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading, description & direct contact links */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <h2
                id="contact-heading"
                className="font-display text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl dark:text-[#F5F5F5]"
              >
                {t.heading}
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t.description}
              </p>

              <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
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

          {/* Right Column: Web3Forms Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-6 sm:p-8 dark:border-neutral-800 dark:bg-[#121212]/60">
              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-[#171717] dark:text-[#F5F5F5]">
                  {t.formTitle}
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {t.formDescription}
                </p>
              </div>

              {status === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-lg border border-teal-500/30 bg-teal-50/50 p-6 text-center dark:border-teal-500/20 dark:bg-teal-950/20"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300">
                    <Check className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-medium text-[#171717] dark:text-[#F5F5F5]">
                    {t.successTitle}
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {t.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    {t.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Web3Forms API: Anti-spam honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-50/60 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <p>{errorMessage || t.errorMessage}</p>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
                    >
                      {t.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder={t.namePlaceholder}
                      className="mt-1.5 block w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-[#171717] placeholder-neutral-400 transition-colors focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E] dark:border-neutral-700 dark:bg-[#181818] dark:text-[#F5F5F5] dark:placeholder-neutral-500 dark:focus:border-[#2DD4BF] dark:focus:ring-[#2DD4BF]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
                    >
                      {t.emailLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder={t.emailPlaceholder}
                      className="mt-1.5 block w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-[#171717] placeholder-neutral-400 transition-colors focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E] dark:border-neutral-700 dark:bg-[#181818] dark:text-[#F5F5F5] dark:placeholder-neutral-500 dark:focus:border-[#2DD4BF] dark:focus:ring-[#2DD4BF]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
                    >
                      {t.messageLabel} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder={t.messagePlaceholder}
                      className="mt-1.5 block w-full resize-y rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-[#171717] placeholder-neutral-400 transition-colors focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E] dark:border-neutral-700 dark:bg-[#181818] dark:text-[#F5F5F5] dark:placeholder-neutral-500 dark:focus:border-[#2DD4BF] dark:focus:ring-[#2DD4BF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0F766E] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0d635c] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#2DD4BF] dark:text-neutral-900 dark:hover:bg-[#20b8a5] dark:focus:ring-[#2DD4BF] dark:focus:ring-offset-neutral-900"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>{t.submittingButton}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>{t.submitButton}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
