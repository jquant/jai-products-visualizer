import { authenticate, getIds } from 'jai-sdk';
import { getSessionData } from '@shared/utils/get-session-data';
export class GetProductsIds {
  static async execute(database: string): Promise<number[] | null> {
    const client = getSessionData();

    if (!client) {
      return null;
    }

    authenticate(client.access_token);

    try {
      const response = await getIds(database, 'complete');

      return response;
    } catch (e) {
      return null;
    }
  }
}
