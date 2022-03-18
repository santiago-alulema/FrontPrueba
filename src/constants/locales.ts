export const defaultLocale = 'es' as const;

export const rtlLocales = ['ar', 'he'] as const;
export const locales = ['en', 'es', 'de', 'zh', ...rtlLocales] as const;
