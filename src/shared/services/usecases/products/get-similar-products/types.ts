export type GetSimilarProductsApiResponse = {
  similarity: Array<{
    query_id: number;
    results: Array<{
      id: number;
      distance: number;
    }>;
  }>;
};
