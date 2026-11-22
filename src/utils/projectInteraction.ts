export type PointerKind = 'mouse' | 'touch' | 'pen' | '';

export interface CardActivationDecision {
  shouldPreventNavigation: boolean;
  nextActiveSlug: string | null;
}

/**
 * Resolves whether activating a ProjectCard should reveal its stack/category
 * overlay (first touch tap) or proceed immediately to open the project
 * (mouse click, keyboard Enter, or second touch tap on an already revealed card).
 */
export function resolveCardActivation(
  slug: string,
  activeSlug: string | null,
  pointerType: PointerKind,
): CardActivationDecision {
  if (pointerType === 'touch') {
    if (activeSlug !== slug) {
      return {
        shouldPreventNavigation: true,
        nextActiveSlug: slug,
      };
    }
    return {
      shouldPreventNavigation: false,
      nextActiveSlug: null,
    };
  }

  return {
    shouldPreventNavigation: false,
    nextActiveSlug: activeSlug,
  };
}

/**
 * Explicit toggle for revealing or collapsing a card's stack/category overlay.
 */
export function toggleRevealedCard(
  slug: string,
  activeSlug: string | null,
): string | null {
  return activeSlug === slug ? null : slug;
}
