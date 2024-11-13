import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeCode(code: string): string {
  return btoa(encodeURIComponent(code));
}

export function decodeCode(encoded: string): string {
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return '';
  }
}

export function generateShareableUrl(code: string, language: string, theme: string): string {
  const params = new URLSearchParams({
    code: encodeCode(code),
    lang: language,
    theme: theme,
  });

  // Check if `window` is defined (i.e., if running in the browser)
  if (typeof window !== 'undefined') {
    return `${window.location.origin}?${params.toString()}`;
  } else {
    return ''; // or provide a default value or handle this case accordingly
  }
}
