import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getNextLanguage,
  isValidLanguage,
  resolveInitialLanguage,
} from './language.ts';
import { getProjectCopy, getSlideLabel, TRANSLATIONS } from '../data/translations.ts';
import { PROJECTS } from '../data/projects.ts';
import { executeTerminalCommand } from './terminal.ts';

test('resolveInitialLanguage honors valid stored language and defaults to en', () => {
  assert.equal(resolveInitialLanguage('id'), 'id');
  assert.equal(resolveInitialLanguage('en'), 'en');
  assert.equal(resolveInitialLanguage(null), 'en');
  assert.equal(resolveInitialLanguage(undefined), 'en');
  assert.equal(resolveInitialLanguage('fr'), 'en');
});

test('getNextLanguage and isValidLanguage toggle cleanly between en and id', () => {
  assert.equal(getNextLanguage('en'), 'id');
  assert.equal(getNextLanguage('id'), 'en');
  assert.equal(isValidLanguage('en'), true);
  assert.equal(isValidLanguage('id'), true);
  assert.equal(isValidLanguage('jp'), false);
});

test('every project has complete English and Indonesian localized copy and slide labels', () => {
  for (const project of PROJECTS) {
    const enCopy = getProjectCopy(project, 'en');
    const idCopy = getProjectCopy(project, 'id');

    assert.ok(enCopy.category.length > 0, `Missing EN category for ${project.slug}`);
    assert.ok(idCopy.category.length > 0, `Missing ID category for ${project.slug}`);
    assert.ok(enCopy.shortDescription.length > 0);
    assert.ok(idCopy.shortDescription.length > 0);
    assert.ok(enCopy.detailNote.length > 0);
    assert.ok(idCopy.detailNote.length > 0);
    assert.notEqual(
      enCopy.shortDescription,
      idCopy.shortDescription,
      `Indonesian shortDescription should differ from English for ${project.slug}`,
    );

    for (const slide of project.gallery) {
      assert.ok(getSlideLabel(slide.label, 'en').length > 0);
      assert.ok(getSlideLabel(slide.label, 'id').length > 0);
    }
  }

  assert.notEqual(TRANSLATIONS.en.hero.headline, TRANSLATIONS.id.hero.headline);
  assert.notEqual(TRANSLATIONS.en.contact.heading, TRANSLATIONS.id.contact.heading);
});

test('executeTerminalCommand supports Indonesian output when lang is id', () => {
  const helpId = executeTerminalCommand('help', 'id');
  assert.ok(helpId.lines[0].text.includes('Perintah'));

  const aboutId = executeTerminalCommand('about', 'id');
  assert.ok(aboutId.lines.some((line) => line.text.includes('pelajar')));

  const unknownId = executeTerminalCommand('tidakada', 'id');
  assert.equal(unknownId.lines[0].tone, 'error');
  assert.ok(unknownId.lines[0].text.includes('Perintah tidak ditemukan'));
});
