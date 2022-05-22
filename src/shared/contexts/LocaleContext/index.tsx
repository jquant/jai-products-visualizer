import { createContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { LocaleContextProps, LocaleProviderProps } from './types';

export const LocaleContext = createContext<LocaleContextProps>({
  currentLocale: 'default',
});

export function LocaleProvider({ children }: LocaleProviderProps) {
  const { locale } = useRouter();
  const [currentLocale, setCurrentLocale] = useState(locale || 'default');

  useEffect(() => {
    if (locale) setCurrentLocale(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        currentLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
