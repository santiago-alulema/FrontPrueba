import { defaultLocale, localeMessages, LOCALE_COOKIE } from '@constants';
import React, { createContext, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { IntlProvider } from 'react-intl';
import { LocaleType } from 'types/lang';
import { setCookie } from 'utils';
import { getInitialLocale, isRTL, LanguageState, reducer } from '.';

export type LanguageContextType = {
  locale: LocaleType;
  changeLanguage: (newLocale: LocaleType) => void;
  isRtl: boolean;
}

const LanguageContext = createContext({} as LanguageContextType);

const INITIAL_STATE: LanguageState = {
  locale: defaultLocale,
};

export type LanguageProviderProps = {}

export const LanguageProvider = ({ children }: PropsWithChildren<LanguageProviderProps>) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { locale } = state;

  const changeLanguage = (newLocale: LocaleType): void => {
    dispatch({ type: 'SET_LANGUAGE', payload: newLocale });
    document.documentElement.lang = newLocale;
    setCookie(LOCALE_COOKIE, newLocale);
  };

  // useEffect runs on client side
  useEffect(() => {
    const initialLocale = getInitialLocale();
    changeLanguage(initialLocale);
  }, []);

  let isRtl = isRTL(locale);

  return (
    <LanguageContext.Provider
      value={{
        locale: locale,
        changeLanguage,
        isRtl,
      }}
    >
      <IntlProvider locale={locale} messages={localeMessages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
