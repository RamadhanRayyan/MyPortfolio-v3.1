import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampSlideIndex,
  getNextSlideIndex,
  getPrevSlideIndex,
  resolveSwipeNavigation,
} from './gallery';

test('getNextSlideIndex and getPrevSlideIndex wrap cleanly around bounds', () => {
  assert.equal(getNextSlideIndex(0, 4), 1);
  assert.equal(getNextSlideIndex(3, 4), 0);
  assert.equal(getPrevSlideIndex(0, 4), 3);
  assert.equal(getPrevSlideIndex(2, 4), 1);
  assert.equal(getNextSlideIndex(0, 1), 0);
  assert.equal(getPrevSlideIndex(0, 0), 0);
});

test('clampSlideIndex normalizes positive and negative out-of-bounds indices', () => {
  assert.equal(clampSlideIndex(-1, 4), 3);
  assert.equal(clampSlideIndex(5, 4), 1);
  assert.equal(clampSlideIndex(2, 0), 0);
});

test('resolveSwipeNavigation responds only past horizontal swipe threshold', () => {
  assert.equal(resolveSwipeNavigation(-60, 0, 4), 1);
  assert.equal(resolveSwipeNavigation(60, 0, 4), 3);
  assert.equal(resolveSwipeNavigation(-20, 1, 4), 1);
  assert.equal(resolveSwipeNavigation(25, 1, 4), 1);
});
