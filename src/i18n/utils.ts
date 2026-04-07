import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: keyof typeof ui) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) {
    return cleanPath;
  }
  return `/fr${cleanPath === '/' ? '' : cleanPath}`;
}

export function getAlternatePaths(url: URL) {
  const { pathname } = url;
  const isFrench = pathname.startsWith('/fr');
  
  if (isFrench) {
    // Current is French, alternate is English (default)
    const enPath = pathname.replace(/^\/fr/, '') || '/';
    return {
      en: enPath,
      fr: pathname
    };
  } else {
    // Current is English, alternate is French
    const frPath = pathname === '/' ? '/fr/' : `/fr${pathname}`;
    return {
      en: pathname,
      fr: frPath
    };
  }
}
