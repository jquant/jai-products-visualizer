import Head from 'next/head';
import type { AppProps } from 'next/app';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  LocaleProvider,
  ProductsProvider,
  UsersProvider,
} from '@shared/contexts';

import { AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '@fontsource/sora/300.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/500.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';
import '@fontsource/sora/800.css';

import '@shared/styles/global.css';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    fonts: {
      body: 'Sora, sans-serif',
    },
    styles: {
      global: {
        body: {
          bg: 'gray.50',
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme} resetCSS>
      <Head>
        <link rel="icon" href="/images/jai_logo.png" />
        <title>JAI - Products Visualizer</title>
      </Head>
      <LocaleProvider>
        <UsersProvider>
          <ProductsProvider>
            <AnimatePresence exitBeforeEnter initial={false}>
              <Component {...pageProps} />
            </AnimatePresence>
          </ProductsProvider>
        </UsersProvider>
      </LocaleProvider>
    </ChakraProvider>
  );
}

export default MyApp;
