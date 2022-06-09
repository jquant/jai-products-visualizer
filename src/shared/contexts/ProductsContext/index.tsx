import {
  GetDatabasesName,
  GetProductsIds,
  GetSimilarProducts,
} from '@shared/services/usecases/products';
import { createContext, ReactNode } from 'react';

import { ProductsContextProps } from './types';

export const ProductsContext = createContext({} as ProductsContextProps);

export function ProductsProvider({ children }: { children: ReactNode }) {
  return (
    <ProductsContext.Provider
      value={{
        fetchSimilarProducts: GetSimilarProducts.execute,
        fetchProducts: GetProductsIds.execute,
        fetchDatabasesName: GetDatabasesName.execute,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
