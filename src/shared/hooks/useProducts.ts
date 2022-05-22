import { useContext } from 'react';

import { ProductsContext } from '@shared/contexts';

export function useProducts() {
  const context = useContext(ProductsContext);

  return {
    ...context,
  };
}
