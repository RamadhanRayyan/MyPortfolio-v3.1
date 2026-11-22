import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveCardActivation,
  toggleRevealedCard,
} from './projectInteraction';
import { PROJECTS } from '../data/projects';

test('every project defines a non-empty technical stack and category', () => {
  assert.equal(PROJECTS.length, 8);
  for (const project of PROJECTS) {
    assert.ok(project.category.trim().length > 0, `${project.name} missing category`);
    assert.ok(
      Array.isArray(project.stack) && project.stack.length >= 2,
      `${project.name} should define at least 2 stack items`,
    );
  }
});

test('mouse and keyboard activation proceed immediately without blocking navigation', () => {
  const mouse = resolveCardActivation('pos', null, 'mouse');
  assert.equal(mouse.shouldPreventNavigation, false);

  const keyboard = resolveCardActivation('29-official-store', null, '');
  assert.equal(keyboard.shouldPreventNavigation, false);
});

test('touch activation reveals on first tap and opens on second tap', () => {
  const firstTap = resolveCardActivation('29-official-store', null, 'touch');
  assert.equal(firstTap.shouldPreventNavigation, true);
  assert.equal(firstTap.nextActiveSlug, '29-official-store');

  const secondTap = resolveCardActivation(
    '29-official-store',
    firstTap.nextActiveSlug,
    'touch',
  );
  assert.equal(secondTap.shouldPreventNavigation, false);
  assert.equal(secondTap.nextActiveSlug, null);

  // Tapping a different card switches the revealed card instead of navigating immediately
  const otherTap = resolveCardActivation('omah-maduku', '29-official-store', 'touch');
  assert.equal(otherTap.shouldPreventNavigation, true);
  assert.equal(otherTap.nextActiveSlug, 'omah-maduku');
});

test('toggleRevealedCard toggles and switches active card cleanly', () => {
  assert.equal(toggleRevealedCard('pos', null), 'pos');
  assert.equal(toggleRevealedCard('pos', 'pos'), null);
  assert.equal(toggleRevealedCard('nutricare', 'pos'), 'nutricare');
});
