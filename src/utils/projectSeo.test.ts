import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../data/projects';
import { PROFILE } from '../data/profile';
import {
  buildProjectCardSeoMeta,
  buildProjectsItemListJsonLd,
} from './projectSeo';

test('buildProjectCardSeoMeta produces category, deduplicated keywords, and stack tags', () => {
  const meta = buildProjectCardSeoMeta(PROJECTS[2]); // 03. 29 Official Store
  assert.equal(meta.identifier, '03');
  assert.equal(meta.applicationCategory, 'E-Commerce');
  assert.equal(meta.keywords, 'E-Commerce, React, Tailwind CSS, Vite, Supabase');
  assert.deepEqual(meta.stackTags, ['React', 'Tailwind CSS', 'Vite', 'Supabase']);
  assert.equal(
    meta.accessibleSummary,
    'Category: E-Commerce. Technical stack: React, Tailwind CSS, Vite, Supabase.',
  );
});

test('buildProjectsItemListJsonLd outputs valid Schema.org ItemList for all 8 projects in exact order', () => {
  const jsonLd = buildProjectsItemListJsonLd(PROJECTS, PROFILE.fullName) as {
    '@context': string;
    '@type': string;
    numberOfItems: number;
    itemListElement: Array<{
      position: number;
      item: {
        '@type': string;
        name: string;
        applicationCategory: string;
        keywords: string;
        url?: string;
      };
    }>;
  };

  assert.equal(jsonLd['@context'], 'https://schema.org');
  assert.equal(jsonLd['@type'], 'ItemList');
  assert.equal(jsonLd.numberOfItems, 8);
  assert.equal(jsonLd.itemListElement.length, 8);

  assert.equal(jsonLd.itemListElement[0].position, 1);
  assert.equal(jsonLd.itemListElement[0].item.name, 'POS');
  assert.equal(jsonLd.itemListElement[0].item.applicationCategory, 'Business System');
  assert.equal(jsonLd.itemListElement[0].item.url, undefined);

  assert.equal(jsonLd.itemListElement[2].position, 3);
  assert.equal(jsonLd.itemListElement[2].item.name, '29 Official Store');
  assert.equal(jsonLd.itemListElement[2].item.url, 'https://29officialstoore.com/');

  assert.equal(jsonLd.itemListElement[7].position, 8);
  assert.equal(jsonLd.itemListElement[7].item.name, 'Renstra Web');
  assert.ok(jsonLd.itemListElement[7].item.keywords.includes('Monitoring Dashboard'));
  assert.ok(jsonLd.itemListElement[7].item.keywords.includes('Supabase'));
});
