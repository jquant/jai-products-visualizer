import { api } from '@shared/services/configs/api.config';

import { GetSimilarProductsApiResponse } from './types';

export class GetSimilarProducts {
  static async execute(params: {
    accessToken: string;
    id: number;
  }): Promise<number[] | null> {
    try {
      const response = await api.get<GetSimilarProductsApiResponse>(
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
