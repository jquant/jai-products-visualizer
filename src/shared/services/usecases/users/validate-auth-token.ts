import { Cookies } from 'react-cookie';

import { api } from '@shared/services/configs/api.config';

export class ValidateAuthToken {
  static async execute(access_token: string) {
    const response = await api.get(`/validation/productimages`, {
      headers: {
        Auth: access_token,
      },
    });

    if (response.status === 200) {
      const cookie = new Cookies();
      const cookieExpiresDate = new Date();

      cookieExpiresDate.setTime(
        cookieExpiresDate.getTime() + 1000 * 60 * 60 * 24
      );

      cookie.set('access_token', access_token, {
        expires: cookieExpiresDate,
      });
    } else
      throw new Error(
        'Access Denied: the provided access token does not have permission to see the collection.'
      );
  }
}
