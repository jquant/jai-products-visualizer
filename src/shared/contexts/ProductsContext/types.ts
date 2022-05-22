export type ProductsContextProps = {
  fetchSimilarProducts(params: {
    accessToken: string;
    id: number;
  }): Promise<number[] | null>;
  fetchProducts(accessToken: string): Promise<number[] | null>;
};
