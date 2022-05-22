import { ReactNode } from 'react';

export type UsersContextProps = {
  validateAuthToken: (access_token: string) => Promise<void>;
};

export type UsersProviderProps = {
  children: ReactNode;
};
