import { UsersContext } from '@shared/contexts';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export function useUsers() {
  const [{ client_session }] = useCookies(['client_session']);
  const { access_token, access_environment } = client_session || {};
  const context = useContext(UsersContext);

  const [isAutheticated, setIsAuthenticated] = useState(Boolean(access_token));

  useEffect(() => {
    setIsAuthenticated(Boolean(access_token));
  }, [access_token]);

  return {
    ...context,
    isAutheticated,
    accessToken: access_token,
    accessEnvironment: access_environment,
  };
}
