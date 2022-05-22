import { useContext } from 'react';

import ptBRLocale from '@shared/locales/pt-BR.json';
import enUSLocale from '@shared/locales/en-US.json';

import { LocaleContext } from '@shared/contexts';

export function useLocale() {
  const { currentLocale } = useContext(LocaleContext);

  switch (currentLocale) {
    case 'en-US':
      return {
        locale: enUSLocale,
        currentLocale,
      };
    default: {
      return {
        locale: ptBRLocale,
        currentLocale,
      };
    }
  }
}
