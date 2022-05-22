import { api } from '@shared/services/configs/api.config';

export class GetProductsIds {
  static async execute(access_token: string): Promise<number[] | null> {
    try {
      const response = await api.get('/id/productimages', {
        headers: {
          Auth: access_token,
        },
      });

      return response.data;
    } catch (e) {
      return null;
    }
  }
}
