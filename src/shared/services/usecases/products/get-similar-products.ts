import { api } from '@shared/services/configs/api.config';

export type RouteResponseProps = {
  similarity: Array<{
    query_id: number;
    results: Array<{
      id: number;
      distance: number;
    }>;
  }>;
};

export class GetSimilarProducts {
  static async execute(params: {
    accessToken: string;
    id: number;
  }): Promise<number[] | null> {
    try {
      const response = await api.get<RouteResponseProps>(
        '/similar/id/productimages',
        {
          headers: {
            Auth: params.accessToken,
          },
          params: {
            id: params.id,
            top_k: 5,
          },
        }
      );

      return (
        response.data.similarity[0].results
          .filter((item) => item.id !== params.id)
          .map((item) => item.id) || null
      );
    } catch {
      return null;
    }
  }
}
