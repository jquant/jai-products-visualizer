import { getSessionData } from '@shared/utils/get-session-data';
import { authenticate, getDatabaseInfo, similaritySearchById } from 'jai-sdk';
import { GetSimilarProductsApiResponse } from './types';

export class GetSimilarProducts {
  static async execute(params: {
    database: string;
    ids: number[];
  }): Promise<number[] | null> {
    const client = getSessionData();

    if (!client) {
      return null;
    }

    authenticate(client.access_token);
    console.log(await getDatabaseInfo('complete'));

    try {
      const response = (await similaritySearchById(
        params.database,
        params.ids
      )) as GetSimilarProductsApiResponse;

      return response.similarity[0].results.map((item) => item.id) || null;
    } catch {
      return null;
    }
  }
}
