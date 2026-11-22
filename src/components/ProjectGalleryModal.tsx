import { useEffect, useRef, useState, type TouchEvent } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  X,
} from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import { getProjectCopy, getSlideLabel, TRANSLATIONS } from '../data/translations';
import {
  getNextSlideIndex,
  getPrevSlideIndex,
  resolveSwipeNavigation,
} from '../utils/gallery';
import type { Language } from '../utils/language';

interface ProjectGalleryModalProps {
  project: ProjectItem | null;
  lang: Language;
  initialSlideIndex?: number;
  onClose: () => void;
}

export function ProjectGalleryModal({
  project,
  lang,
  initialSlideIndex = 0,
  onClose,
}: ProjectGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialSlideIndex);
  const touchStartXRef = useRef<number | null>(null);

  const slides = project?.gallery ?? [];
  const totalSlides = slides.length;
  const safeIndex = totalSlides > 0 ? Math.min(activeIndex, totalSlides - 1) : 0;
  const currentSlide = totalSlides > 0 ? slides[safeIndex] : null;
  const t = TRANSLATIONS[lang].gallery;

  useEffect(() => {
    setActiveIndex(initialSlideIndex);
  }, [project?.slug, initialSlideIndex]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && totalSlides > 1) {
        event.preventDefault();
        setActiveIndex((prev) => getNextSlideIndex(prev, totalSlides));
      } else if (event.key === 'ArrowLeft' && totalSlides > 1) {
        event.preventDefault();
        setActiveIndex((prev) => getPrevSlideIndex(prev, totalSlides));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, totalSlides, onClose]);

  if (!project) return null;

  const copy = getProjectCopy(project, lang);

  const handlePrev = () => {
    setActiveIndex((prev) => getPrevSlideIndex(prev, totalSlides));
  };

  const handleNext = () => {
    setActiveIndex((prev) => getNextSlideIndex(prev, totalSlides));
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    setActiveIndex((prev) => resolveSwipeNavigation(deltaX, prev, totalSlides));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-gallery-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2px] border border-neutral-200 bg-[#FAFAFA] dark:border-neutral-800 dark:bg-[#141414]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-200 px-4 py-2.5 sm:px-5 dark:border-neutral-800">
          <div className="flex min-w-0 items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="font-mono font-medium tabular-nums text-[#171717] dark:text-[#F5F5F5]">
              {project.number}
            </span>
            <span aria-hidden="true">·</span>
            <h3
              id="project-gallery-title"
              className="truncate font-display text-sm font-semibold text-[#171717] sm:text-base dark:text-[#F5F5F5]"
            >
              {project.name}
            </h3>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="hidden truncate sm:inline">{copy.category}</span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {totalSlides > 0 && (
              <span
                data-testid="gallery-slide-counter"
                className="font-mono text-xs tabular-nums text-neutral-500 dark:text-neutral-400"
              >
                {safeIndex + 1} / {totalSlides}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label={t.closeAria}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[2px] text-neutral-500 transition-colors hover:bg-neutral-200/70 hover:text-[#171717] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-[#F5F5F5]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable body for very small heights */}
        <div className="overflow-y-auto">
          {/* Main Gallery Stage */}
          <div
            className="relative aspect-[16/10] w-full bg-[#EFEFEF] select-none sm:aspect-auto sm:h-[48vh] sm:max-h-[440px] sm:min-h-[280px] dark:bg-[#0C0C0C]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentSlide ? (
              <img
                key={currentSlide.src}
                src={currentSlide.src}
                alt={currentSlide.alt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
                <span className="font-mono text-xs text-[#0F766E] dark:text-[#2DD4BF]">
                  {project.number} · {copy.category}
                </span>
                <p className="font-display text-2xl font-semibold text-[#171717] dark:text-[#F5F5F5]">
                  {project.name}
                </p>
                <p className="max-w-sm text-xs text-neutral-500 dark:text-neutral-400">
                  {t.privateNotice}
                </p>
              </div>
            )}

            {totalSlides > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={t.prevAria}
                  className="absolute top-1/2 left-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[2px] border border-neutral-200/80 bg-white/95 text-[#171717] transition-colors hover:border-neutral-400 hover:bg-white sm:h-10 sm:w-10 dark:border-neutral-700 dark:bg-[#161616]/95 dark:text-[#F5F5F5] dark:hover:border-neutral-500"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={t.nextAria}
                  className="absolute top-1/2 right-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[2px] border border-neutral-200/80 bg-white/95 text-[#171717] transition-colors hover:border-neutral-400 hover:bg-white sm:h-10 sm:w-10 dark:border-neutral-700 dark:bg-[#161616]/95 dark:text-[#F5F5F5] dark:hover:border-neutral-500"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {/* Active Slide Caption + E-Commerce Thumbnail Filmstrip */}
          {totalSlides > 0 && currentSlide && (
            <div className="border-t border-neutral-200 bg-white px-4 py-2.5 sm:px-5 dark:border-neutral-800 dark:bg-[#161616]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#171717] dark:text-[#F5F5F5]">
                  {currentSlide.viewport === 'mobile' ? (
                    <Smartphone
                      className="h-3.5 w-3.5 text-[#0F766E] dark:text-[#2DD4BF]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Monitor
                      className="h-3.5 w-3.5 text-[#0F766E] dark:text-[#2DD4BF]"
                      aria-hidden="true"
                    />
                  )}
                  <span data-testid="gallery-active-label">
                    {getSlideLabel(currentSlide.label, lang)}
                  </span>
                </div>
                {totalSlides > 1 && (
                  <span className="hidden font-mono text-[11px] text-neutral-500 sm:inline dark:text-neutral-400">
                    {t.keyboardHint}
                  </span>
                )}
              </div>

              {totalSlides > 1 && (
                <div
                  role="tablist"
                  aria-label={t.slidesTablistAria}
                  className="mt-2.5 flex items-center gap-2.5 overflow-x-auto pb-0.5"
                >
                  {slides.map((slide, idx) => {
                    const isActive = idx === safeIndex;
                    const localizedLabel = getSlideLabel(slide.label, lang);
                    return (
                      <button
                        key={slide.src}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={t.viewSlideAria(idx + 1, localizedLabel)}
                        onClick={() => setActiveIndex(idx)}
                        className={`group flex w-28 shrink-0 flex-col overflow-hidden rounded-[2px] border text-left transition-colors sm:w-32 ${
                          isActive
                            ? 'border-[#0F766E] bg-neutral-50 dark:border-[#2DD4BF] dark:bg-[#1E1E1E]'
                            : 'border-neutral-200 bg-white opacity-75 hover:border-neutral-400 hover:opacity-100 dark:border-neutral-800 dark:bg-[#121212] dark:hover:border-neutral-600'
                        }`}
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                          <img
                            src={slide.src}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                        <span
                          className={`truncate px-2 py-1 font-mono text-[10px] ${
                            isActive
                              ? 'font-medium text-[#0F766E] dark:text-[#2DD4BF]'
                              : 'text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {localizedLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Project Details & Action Footer */}
          <div className="border-t border-neutral-200 px-4 py-3.5 sm:px-5 dark:border-neutral-800">
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {copy.detailNote}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                <span className="text-[#171717] dark:text-[#F5F5F5]">
                  {t.stackLabel}
                </span>{' '}
                {project.stack.join(' · ')}
              </p>

              <div className="flex items-center gap-2.5">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-[2px] bg-[#171717] px-4 py-1.5 text-xs font-medium text-[#FAFAFA] whitespace-nowrap transition-colors hover:bg-[#0F766E] dark:bg-[#F5F5F5] dark:text-[#111111] dark:hover:bg-[#2DD4BF]"
                  >
                    <span>{t.visitWebsite}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-[2px] bg-[#171717] px-4 py-1.5 text-xs font-medium text-[#FAFAFA] whitespace-nowrap transition-colors hover:bg-[#0F766E] dark:bg-[#F5F5F5] dark:text-[#111111] dark:hover:bg-[#2DD4BF]"
                  >
                    <span>{t.requestDemo}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[38px] items-center rounded-[2px] border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
