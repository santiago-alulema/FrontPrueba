import { CacheProvider, EmotionCache } from '@emotion/react';
import { SEO } from 'components';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AppProps } from 'next/app';
import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { GlobalContextProvider } from '../context';
import createEmotionCache from '../helpers/createEmotionCache';

dayjs.locale('es');

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <SEO title="Radi" description="" />
      <GlobalContextProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </GlobalContextProvider>
    </CacheProvider>
  );
}