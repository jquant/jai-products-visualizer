import { Cookies } from 'react-cookie';

export function getSessionData() {
  const cookies = new Cookies();
  const client_session = cookies.get('client_session');

  if (!client_session) {
    return null;
  }

  const { access_token, access_environment } = client_session;

  return {
    access_token,
    access_environment,
  };
}
