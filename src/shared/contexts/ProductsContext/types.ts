export type ProductsContextProps = {
  fetchSimilarProducts(params: {
    database: string;
    ids: number[];
  }): Promise<number[] | null>;
  fetchProducts(database: string): Promise<number[] | null>;
};
