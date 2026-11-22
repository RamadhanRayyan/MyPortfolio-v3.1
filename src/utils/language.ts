export type Language = 'en' | 'id';

export const LANGUAGE_STORAGE_KEY = 'rayy-lang';

export function isValidLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'id';
}

export function resolveInitialLanguage(
  storedValue: string | null | undefined,
): Language {
  if (isValidLanguage(storedValue)) {
    return storedValue;
  }
  return 'en';
}

export function getNextLanguage(current: Language): Language {
  return current === 'en' ? 'id' : 'en';
}

export function applyLanguageToDocument(lang: Language): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
}

export function readStoredLanguage(): string | null {
  try {
    return typeof localStorage !== 'undefined'
      ? localStorage.getItem(LANGUAGE_STORAGE_KEY)
      : null;
  } catch {
    return null;
  }
}

export function saveStoredLanguage(lang: Language): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  } catch {
    // Ignore storage write failures in private browsing contexts
  }
}
