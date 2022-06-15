import {
  ProductProps,
  ProductResponseProps,
} from '@shared/services/usecases/products/get-products/types';

export type ProductsContextProps = {
  fetchSimilarProducts(params: {
    database: string;
    ids: number[];
  }): Promise<number[] | null>;
  fetchProducts(params?: {
    page?: number;
    limit?: number;
    filter?: {
      [key in keyof ProductProps & {
        $or?: {
          [key in keyof ProductProps]: any;
        };
      }]?: any;
    };
  }): Promise<ProductResponseProps | null>;
  fetchDatabasesName: () => Promise<string[] | null>;
};
