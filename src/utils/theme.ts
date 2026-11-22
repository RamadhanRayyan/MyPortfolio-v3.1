export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'rayy-theme';

export function isValidTheme(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

export function resolveInitialTheme(
  storedValue: string | null | undefined,
  systemPrefersDark: boolean,
): ThemeMode {
  if (isValidTheme(storedValue)) {
    return storedValue;
  }
  return systemPrefersDark ? 'dark' : 'light';
}

export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

export function applyThemeToDocument(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function readStoredTheme(): string | null {
  try {
    return typeof localStorage !== 'undefined'
      ? localStorage.getItem(THEME_STORAGE_KEY)
      : null;
  } catch {
    return null;
  }
}

export function saveStoredTheme(theme: ThemeMode): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Ignore storage write failures in private browsing contexts
  }
}
