import { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';

import { Flex } from '@chakra-ui/react';

import { Header } from '@components/core/header';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />

      <Flex direction="column" width="full">
        {children}
      </Flex>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </Flex>
  );
}
