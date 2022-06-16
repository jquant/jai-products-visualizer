import { useContext } from 'react';

import ptBRLocale from '@shared/locales/pt-BR.json';
import enUSLocale from '@shared/locales/en-US.json';

import { LocaleContext } from '@shared/contexts';

export function useLocale() {
  const { currentLocale } = useContext(LocaleContext);

  switch (currentLocale) {
    case 'pt-BR':
      return {
        locale: ptBRLocale,
        currentLocale,
      };
    default: {
      return {
        locale: enUSLocale,
        currentLocale,
      };
    }
  }
}
