import { getIds, getFields } from 'jai-sdk';
import axios from 'axios';
import { getSessionData } from '@shared/utils/get-session-data';
import { apiConfig } from '@shared/services/config/api.config';
import { ProductResponseProps, ProductProps } from './types';

export type GetProductsParams = {
  page?: number;
  limit?: number;
  filter?: {
    [key in keyof ProductProps]?: any;
  };
};

export class GetProductsIds {
  static async execute(
    params?: GetProductsParams
  ): Promise<ProductResponseProps | null> {
    const client = getSessionData();

    if (!client) {
      return null;
    }

    try {
      const response = await axios.post(
        apiConfig.routes.collections,
        {
          database: 'jai-demo',
          collection: 'rec-test',
          filter: params?.filter,
        },
        {
          params: {
            page: params?.page,
            limit: params?.limit,
          },
          headers: {
            auth_key: client.access_token,
          },
        }
      );

      return response.data ?? [];
    } catch (e) {
      return null;
    }
  }
}
