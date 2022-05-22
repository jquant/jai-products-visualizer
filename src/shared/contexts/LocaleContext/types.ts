import { ReactNode } from 'react';

export type LocaleContextProps = {
  currentLocale: string;
};

export type LocaleProviderProps = {
  children: ReactNode;
};
