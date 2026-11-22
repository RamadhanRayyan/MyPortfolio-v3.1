export interface GallerySlide {
  src: string;
  alt: string;
  label: string;
  viewport: 'mobile' | 'desktop';
}

export function clampSlideIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function getNextSlideIndex(current: number, total: number): number {
  if (total <= 1) return 0;
  return clampSlideIndex(current + 1, total);
}

export function getPrevSlideIndex(current: number, total: number): number {
  if (total <= 1) return 0;
  return clampSlideIndex(current - 1, total);
}

/**
 * Resolves swipe gesture direction: negative deltaX (swipe left) moves to next slide,
 * positive deltaX (swipe right) moves to previous slide when exceeding threshold.
 */
export function resolveSwipeNavigation(
  deltaX: number,
  current: number,
  total: number,
  thresholdPx = 40,
): number {
  if (total <= 1 || Math.abs(deltaX) < thresholdPx) {
    return current;
  }
  return deltaX < 0
    ? getNextSlideIndex(current, total)
    : getPrevSlideIndex(current, total);
}
