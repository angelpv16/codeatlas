import en from './en.json';
import es from './es.json';

type Lang = 'en' | 'es';

const translations: Record<Lang, Record<string, string>> = { en, es };

export function t(key: string, lang: Lang = 'en'): string {
  return translations[lang]?.[key] ?? translations['en'][key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const params = new URLSearchParams(url.search);
  const lang = params.get('lang');
  if (lang === 'es') return 'es';
  return 'en';
}

export type { Lang };
