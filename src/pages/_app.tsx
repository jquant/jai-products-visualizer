import Head from 'next/head';
import type { AppProps } from 'next/app';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  LocaleProvider,
  ProductsProvider,
  UsersProvider,
} from '@shared/contexts';

import { AnimatePresence } from 'framer-motion';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    fonts: {
      body: 'Inter, sans-serif',
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
        <title>JAI Products Visualizer</title>
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
