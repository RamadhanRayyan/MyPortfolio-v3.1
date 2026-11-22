import type { ProjectItem } from '../data/projects';

export interface ProjectCardSeoMeta {
  identifier: string;
  applicationCategory: string;
  keywords: string;
  stackTags: readonly string[];
  accessibleSummary: string;
}

export function buildProjectCardSeoMeta(project: ProjectItem): ProjectCardSeoMeta {
  const uniqueKeywords = Array.from(
    new Set([project.category, ...project.stack].map((item) => item.trim()).filter(Boolean)),
  );

  return {
    identifier: project.number,
    applicationCategory: project.category,
    keywords: uniqueKeywords.join(', '),
    stackTags: project.stack,
    accessibleSummary: `Category: ${project.category}. Technical stack: ${project.stack.join(', ')}.`,
  };
}

export function buildProjectsItemListJsonLd(
  projects: readonly ProjectItem[],
  authorName: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected Projects',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => {
      const seo = buildProjectCardSeoMeta(project);
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.name,
          description: project.shortDescription,
          applicationCategory: seo.applicationCategory,
          operatingSystem: 'Web',
          keywords: seo.keywords,
          ...(project.url ? { url: project.url } : {}),
          author: {
            '@type': 'Person',
            name: authorName,
          },
        },
      };
    }),
  };
}
