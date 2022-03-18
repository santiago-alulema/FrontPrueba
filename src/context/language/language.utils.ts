import { defaultLocale, locales, LOCALE_COOKIE, rtlLocales } from '@constants';
import { LocaleType } from 'types/lang';
import { getCookie } from 'utils';

export function isValidLocale(tested: LocaleType) {
  return locales.some((locale) => locale === tested);
}

export function isRTL(tested: LocaleType) {
  return rtlLocales.some((locale) => locale === tested);
}

export function getInitialLocale(): LocaleType {
  // preference from the previous session
  const localeFromCookie = getCookie(LOCALE_COOKIE) as LocaleType;
  if (localeFromCookie && isValidLocale(localeFromCookie)) {
    // if locale cookie found and is available for our config
    return localeFromCookie;
  }

  // try to take language setting of the browser
  const [localeFromBrowser]= navigator.language.split('-');
  if (isValidLocale(localeFromBrowser as LocaleType)) {
    // if locale is available for our config
    return localeFromBrowser as LocaleType;
  }

  // return default locale
  return defaultLocale;
}
