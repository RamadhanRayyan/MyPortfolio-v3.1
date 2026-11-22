import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextTheme, resolveInitialTheme } from './theme';

test('resolveInitialTheme honors valid stored preference over system preference', () => {
  assert.equal(resolveInitialTheme('dark', false), 'dark');
  assert.equal(resolveInitialTheme('light', true), 'light');
});

test('resolveInitialTheme falls back to system preference when unset or invalid', () => {
  assert.equal(resolveInitialTheme(null, true), 'dark');
  assert.equal(resolveInitialTheme(null, false), 'light');
  assert.equal(resolveInitialTheme('invalid-value', true), 'dark');
  assert.equal(resolveInitialTheme(undefined, false), 'light');
});

test('getNextTheme toggles between light and dark', () => {
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');
});
