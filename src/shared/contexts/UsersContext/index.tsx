import { createContext } from 'react';

import { ValidateAuthToken } from '@shared/services/usecases/users/validate-auth-token';

import { UsersContextProps, UsersProviderProps } from './types';

export const UsersContext = createContext({} as UsersContextProps);

export function UsersProvider({ children }: UsersProviderProps) {
  return (
    <UsersContext.Provider
      value={{
        validateAuthToken: ValidateAuthToken.execute,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
