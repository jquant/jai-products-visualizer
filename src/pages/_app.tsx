import type { AppProps } from 'next/app';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  LocaleProvider,
  ProductsProvider,
  UsersProvider,
} from '@shared/contexts';

import { AnimatePresence } from 'framer-motion';

import '@fontsource/inter';

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
