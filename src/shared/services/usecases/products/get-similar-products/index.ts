import { getSessionData } from '@shared/utils/get-session-data';
import { authenticate, similaritySearchById } from 'jai-sdk';

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

    try {
      const response = similaritySearchById(params.database, params.ids);

      return response;
    } catch {
      return null;
    }
  }
}
