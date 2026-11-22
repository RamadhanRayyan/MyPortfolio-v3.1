import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Images, Layers } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PROJECTS, type ProjectItem } from '../data/projects';
import { getProjectCopy, TRANSLATIONS } from '../data/translations';
import type { Language } from '../utils/language';
import { toggleRevealedCard } from '../utils/projectInteraction';
import {
  buildProjectCardSeoMeta,
  buildProjectsItemListJsonLd,
} from '../utils/projectSeo';
import { ProjectGalleryModal } from './ProjectGalleryModal';

interface ProjectThumbnailProps {
  project: ProjectItem;
  lang: Language;
  categoryLabel: string;
  isRevealed?: boolean;
  specPanelId?: string;
}

function ProjectThumbnail({
  project,
  lang,
  categoryLabel,
  isRevealed = false,
  specPanelId,
}: ProjectThumbnailProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(project.previewImage) && !imgFailed;
  const slideCount = project.gallery.length;
  const t = TRANSLATIONS[lang].projects;

  const specOverlay = (
    <div
      id={specPanelId}
      data-testid={`project-specs-${project.slug}`}
      data-revealed={isRevealed ? 'true' : 'false'}
      className={`pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0B0B0B]/95 via-[#0B0B0B]/84 to-[#0B0B0B]/25 p-3 sm:p-3.5 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isRevealed
          ? 'translate-y-0 opacity-100'
          : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100'
      }`}
    >
      <div className="border-t border-white/20 pt-2">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] font-medium tracking-wide text-[#2DD4BF] sm:text-[11px]">
            {categoryLabel}
          </p>
          {slideCount > 1 && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-neutral-300">
              <Images className="h-3 w-3" aria-hidden="true" />
              <span>{slideCount}</span>
            </span>
          )}
        </div>
        <p className="mt-1 font-mono text-[10px] leading-snug text-neutral-100 sm:text-[11px]">
          {project.stack.join(' · ')}
        </p>
        <p className="mt-1.5 font-sans text-[10px] font-medium text-neutral-300">
          {slideCount > 1 ? t.clickForDesktopOverview : t.clickForDetails}
        </p>
      </div>
    </div>
  );

  if (showImage && project.previewImage) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-[#1A1A1A]">
        <img
          src={project.previewImage}
          alt={project.previewAlt}
          itemProp="image"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className={`h-full w-full object-cover object-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? 'scale-[1.03]' : 'group-hover:scale-[1.03]'
          }`}
        />
        {specOverlay}
      </div>
    );
  }

  // Honest editorial identity fallback when no live screenshot exists (e.g., NutriCare)
  return (
    <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-[#F3F4F3] p-3 sm:p-4 dark:border-neutral-800 dark:bg-[#171918]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(115,115,115,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(115,115,115,0.16) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
          {project.number}
        </span>
        <span className="font-mono text-[10px] text-[#0F766E] dark:text-[#2DD4BF]">
          {categoryLabel}
        </span>
      </div>

      <div className="relative">
        <p className="font-display text-lg font-semibold tracking-tight text-[#171717] transition-transform duration-200 group-hover:translate-x-0.5 sm:text-xl dark:text-[#F5F5F5]">
          {project.name}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
          {t.privateWebBuild}
        </p>
      </div>

      {specOverlay}
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectItem;
  lang: Language;
  isRevealed: boolean;
  onToggleReveal: (slug: string) => void;
  onOpenGallery: (project: ProjectItem) => void;
}

function ProjectCard({
  project,
  lang,
  isRevealed,
  onToggleReveal,
  onOpenGallery,
}: ProjectCardProps) {
  const isExternal = Boolean(project.url);
  const specPanelId = `project-specs-${project.slug}`;
  const seoMeta = buildProjectCardSeoMeta(project);
  const t = TRANSLATIONS[lang].projects;
  const copy = getProjectCopy(project, lang);

  const infoContent = (
    <div className="flex flex-1 flex-col p-3 pb-2.5 sm:p-4 sm:pb-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
          <span className="font-mono font-medium tabular-nums text-[#171717] dark:text-[#F5F5F5]">
            {project.number}
          </span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{copy.category}</span>
        </div>

        {isExternal ? (
          <ArrowUpRight
            className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
              isRevealed
                ? 'translate-x-0.5 -translate-y-0.5 text-[#0F766E] dark:text-[#2DD4BF]'
                : 'text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0F766E] dark:text-neutral-500 dark:group-hover:text-[#2DD4BF]'
            }`}
            aria-hidden="true"
          />
        ) : (
          <ArrowRight
            className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
              isRevealed
                ? 'translate-x-0.5 text-[#0F766E] dark:text-[#2DD4BF]'
                : 'text-neutral-400 group-hover:translate-x-0.5 group-hover:text-[#0F766E] dark:text-neutral-500 dark:group-hover:text-[#2DD4BF]'
            }`}
            aria-hidden="true"
          />
        )}
      </div>

      <h3
        itemProp="name"
        className={`mt-2 font-display text-[15px] font-semibold leading-snug tracking-tight transition-colors duration-150 sm:text-base ${
          isRevealed
            ? 'text-[#0F766E] dark:text-[#2DD4BF]'
            : 'text-[#171717] group-hover:text-[#0F766E] dark:text-[#F5F5F5] dark:group-hover:text-[#2DD4BF]'
        }`}
      >
        {project.name}
      </h3>

      <p
        itemProp="description"
        className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-neutral-600 sm:text-[13px] dark:text-neutral-400"
      >
        {copy.shortDescription}
      </p>
    </div>
  );

  return (
    <article
      itemScope
      itemType="https://schema.org/SoftwareApplication"
      data-revealed={isRevealed ? 'true' : 'false'}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-[2px] border bg-white transition-colors duration-200 dark:bg-[#161616] ${
        isRevealed
          ? 'border-[#0F766E] dark:border-[#2DD4BF]'
          : 'border-neutral-200 hover:border-neutral-400 focus-within:border-[#0F766E] dark:border-neutral-800 dark:hover:border-neutral-600 dark:focus-within:border-[#2DD4BF]'
      }`}
    >
      {/* Semantic Schema.org microdata for search indexing */}
      <meta itemProp="identifier" content={seoMeta.identifier} />
      <meta itemProp="applicationCategory" content={seoMeta.applicationCategory} />
      <meta itemProp="operatingSystem" content="Web" />
      <meta itemProp="keywords" content={seoMeta.keywords} />
      {project.url && <meta itemProp="url" content={project.url} />}

      {/* Visually hidden semantic category & stack tags for crawlers and screen readers */}
      <span className="sr-only" data-testid={`project-seo-${project.slug}`}>
        <span itemProp="genre">{copy.category}</span>
        {' — '}
        {seoMeta.stackTags.map((tech, index) => (
          <span key={tech} itemProp="about">
            {tech}
            {index < seoMeta.stackTags.length - 1 ? ', ' : ''}
          </span>
        ))}
      </span>

      {/* Clicking the thumbnail opens the e-commerce style overview gallery */}
      <button
        type="button"
        onClick={() => onOpenGallery(project)}
        aria-label={t.openGalleryAria(project.number, project.name)}
        className="block w-full cursor-pointer text-left focus-visible:outline-none"
      >
        <ProjectThumbnail
          project={project}
          lang={lang}
          categoryLabel={copy.category}
          isRevealed={isRevealed}
          specPanelId={specPanelId}
        />
      </button>

      {/* Clicking the title & summary opens the live site (or gallery for private builds) */}
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.openLiveAria(project.number, project.name, copy.category)}
          className="flex flex-1 flex-col text-left focus-visible:outline-none"
        >
          {infoContent}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onOpenGallery(project)}
          aria-label={t.viewDetailsAria(project.number, project.name, copy.category)}
          className="flex flex-1 cursor-pointer flex-col text-left focus-visible:outline-none"
        >
          {infoContent}
        </button>
      )}

      {/* Footer row: direct link / status + explicit stack reveal toggle */}
      <div className="flex items-center justify-between gap-2 border-t border-neutral-100 px-3 py-2 text-[11px] sm:px-4 sm:py-2.5 dark:border-neutral-800/80">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`truncate font-mono transition-colors duration-150 ${
              isRevealed
                ? 'text-[#0F766E] dark:text-[#2DD4BF]'
                : 'text-neutral-500 hover:text-[#0F766E] dark:text-neutral-400 dark:hover:text-[#2DD4BF]'
            }`}
          >
            {project.urlLabel}
          </a>
        ) : (
          <span
            className={`truncate font-mono transition-colors duration-150 ${
              isRevealed
                ? 'text-[#0F766E] dark:text-[#2DD4BF]'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {t.privateDeployment}
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleReveal(project.slug)}
          aria-expanded={isRevealed}
          aria-controls={specPanelId}
          aria-label={t.toggleStackAria(isRevealed, project.name)}
          className={`inline-flex min-h-[28px] shrink-0 items-center gap-1 px-1.5 font-mono text-[10px] font-medium whitespace-nowrap transition-colors duration-150 sm:text-[11px] ${
            isRevealed
              ? 'text-[#0F766E] dark:text-[#2DD4BF]'
              : 'text-neutral-500 hover:text-[#171717] dark:text-neutral-400 dark:hover:text-[#F5F5F5]'
          }`}
        >
          <Layers className="h-3 w-3" aria-hidden="true" />
          <span>{isRevealed ? t.hideButton : t.stackButton}</span>
        </button>
      </div>
    </article>
  );
}

interface ProjectsSectionProps {
  lang: Language;
}

export function ProjectsSection({ lang }: ProjectsSectionProps) {
  const [activeGalleryProject, setActiveGalleryProject] =
    useState<ProjectItem | null>(null);
  const [revealedSlug, setRevealedSlug] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const t = TRANSLATIONS[lang].projects;

  const projectsJsonLd = useMemo(
    () => JSON.stringify(buildProjectsItemListJsonLd(PROJECTS, PROFILE.fullName)),
    [],
  );

  // Dismiss touch-pinned stack overlay when tapping outside the projects grid or pressing Escape
  useEffect(() => {
    if (!revealedSlug) return;
    const handleOutsidePointerDown = (event: globalThis.PointerEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        setRevealedSlug(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setRevealedSlug(null);
      }
    };
    document.addEventListener('pointerdown', handleOutsidePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [revealedSlug]);

  const handleToggleReveal = (slug: string) => {
    setRevealedSlug((prev) => toggleRevealedCard(slug, prev));
  };

  const handleOpenGallery = (project: ProjectItem) => {
    setRevealedSlug(null);
    setActiveGalleryProject(project);
  };

  // Start on Slide 2 (Desktop Overview) when a mobile poster + desktop slides exist,
  // so clicking the mobile thumbnail immediately reveals the desktop overview with all slides below.
  const initialGallerySlide =
    activeGalleryProject && activeGalleryProject.gallery.length > 1 ? 1 : 0;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-14 border-t border-neutral-200 dark:border-neutral-800"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: projectsJsonLd }}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2
              id="projects-heading"
              className="font-display text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#F5F5F5]"
            >
              {t.heading}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-[15px] dark:text-neutral-400">
              {t.subtitle}
            </p>
          </div>
          <p className="font-mono text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
            01 — {String(PROJECTS.length).padStart(2, '0')} · {t.metaSummary}
          </p>
        </div>

        {/*
          Exact grid requirements:
          - Mobile: 2 columns x 4 rows (grid-cols-2)
          - Tablet: 3 columns (md:grid-cols-3)
          - Desktop: 4 columns x 2 rows (lg:grid-cols-4)
        */}
        <div
          ref={gridRef}
          data-testid="projects-grid"
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              lang={lang}
              isRevealed={revealedSlug === project.slug}
              onToggleReveal={handleToggleReveal}
              onOpenGallery={handleOpenGallery}
            />
          ))}
        </div>
      </div>

      <ProjectGalleryModal
        project={activeGalleryProject}
        lang={lang}
        initialSlideIndex={initialGallerySlide}
        onClose={() => setActiveGalleryProject(null)}
      />
    </section>
  );
}
