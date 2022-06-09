import { authenticate } from 'jai-sdk';
import { Cookies } from 'react-cookie';

export class AuthenticateUser {
  static async execute(access_token: string, access_environment: string) {
    try {
      authenticate(access_token);

      const cookie = new Cookies();
      const cookieExpiresDate = new Date();

      cookieExpiresDate.setTime(
        cookieExpiresDate.getTime() + 1000 * 60 * 60 * 24
      );

      cookie.set(
        'client_session',
        JSON.stringify({
          access_token,
          access_environment,
        }),
        {
          expires: cookieExpiresDate,
        }
      );
    } catch {
      throw new Error('Unable to authenticate the access token');
    }
  }
}
