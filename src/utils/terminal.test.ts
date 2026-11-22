import test from 'node:test';
import assert from 'node:assert/strict';
import {
  executeTerminalCommand,
  normalizeTerminalInput,
  tabCompleteCommand,
} from './terminal';
import { PROJECTS } from '../data/projects';

test('projects list preserves exact count (8) and required order', () => {
  assert.equal(PROJECTS.length, 8);
  assert.deepEqual(
    PROJECTS.map((p) => `${p.number}. ${p.name}`),
    [
      '01. POS',
      '02. NutriCare',
      '03. 29 Official Store',
      '04. Omah Maduku',
      '05. Aura Medistra',
      '06. PRH Project',
      '07. Ramadhan Portals',
      '08. Renstra Web',
    ],
  );
});

test('projects list preserves exact verified public URLs', () => {
  assert.equal(PROJECTS[0].url, null);
  assert.equal(PROJECTS[1].url, null);
  assert.equal(PROJECTS[2].url, 'https://29officialstoore.com/');
  assert.equal(PROJECTS[3].url, 'https://omahmaduku.netlify.app/');
  assert.equal(PROJECTS[4].url, 'https://auramedistra.my.id/');
  assert.equal(PROJECTS[5].url, 'https://prhproject.netlify.app/');
  assert.equal(PROJECTS[6].url, 'https://ramadhanportals.netlify.app/');
  assert.equal(PROJECTS[7].url, 'https://renstraweb.netlify.app/');
});

test('normalizeTerminalInput trims whitespace, strips leading $, and lowercases', () => {
  assert.equal(normalizeTerminalInput('  HELP  '), 'help');
  assert.equal(normalizeTerminalInput('$ Projects'), 'projects');
  assert.equal(normalizeTerminalInput('   '), '');
});

test('executeTerminalCommand handles all 5 predefined commands plus clear', () => {
  const help = executeTerminalCommand('help');
  assert.equal(help.action, 'output');
  assert.ok(help.lines.some((l) => l.text.includes('about')));
  assert.ok(help.lines.some((l) => l.text.includes('projects')));
  assert.ok(help.lines.some((l) => l.text.includes('stack')));
  assert.ok(help.lines.some((l) => l.text.includes('contact')));

  const about = executeTerminalCommand('about');
  assert.ok(about.lines.some((l) => l.text.includes('Muhammad Ramadhan Rayyan')));
  assert.ok(about.lines.some((l) => l.text.includes('Semarang, Indonesia')));

  const projects = executeTerminalCommand('projects');
  assert.equal(projects.lines.length, 9); // 1 header + 8 projects
  assert.ok(projects.lines[1].text.includes('01. POS'));
  assert.ok(projects.lines[8].text.includes('08. Renstra Web'));
  assert.equal(projects.lines[3].href, 'https://29officialstoore.com/');

  const stack = executeTerminalCommand('stack');
  assert.ok(stack.lines.some((l) => l.text.includes('React') && l.text.includes('Supabase')));

  const contact = executeTerminalCommand('contact');
  assert.ok(contact.lines.some((l) => l.href === 'https://github.com/RamadhanRayyan'));
  assert.ok(contact.lines.some((l) => l.href === 'https://www.instagram.com/rayy.programmer'));
  assert.ok(contact.lines.some((l) => l.href === 'mailto:muhammadramadhanrayyan@gmail.com'));

  const clear = executeTerminalCommand('clear');
  assert.equal(clear.action, 'clear');
  assert.equal(clear.lines.length, 0);
});

test('executeTerminalCommand returns helpful error for unknown command', () => {
  const unknown = executeTerminalCommand('sudo rm -rf');
  assert.equal(unknown.action, 'output');
  assert.equal(unknown.lines[0].tone, 'error');
  assert.ok(unknown.lines[0].text.includes('Command not found'));
});

test('tabCompleteCommand completes prefixes accurately', () => {
  assert.equal(tabCompleteCommand('pr'), 'projects');
  assert.equal(tabCompleteCommand('st'), 'stack');
  assert.equal(tabCompleteCommand('co'), 'contact');
  assert.equal(tabCompleteCommand(''), 'help');
  assert.equal(tabCompleteCommand('xyz'), 'xyz');
});
