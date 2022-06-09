import { createContext } from 'react';

import { ValidateAuthToken } from '@shared/services/usecases/users/validate-auth-token';

import { UsersContextProps, UsersProviderProps } from './types';
import { AuthenticateUser } from '@shared/services/usecases/users';

export const UsersContext = createContext({} as UsersContextProps);

export function UsersProvider({ children }: UsersProviderProps) {
  return (
    <UsersContext.Provider
      value={{
        validateAuthToken: ValidateAuthToken.execute,
        authenticateUser: AuthenticateUser.execute,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
