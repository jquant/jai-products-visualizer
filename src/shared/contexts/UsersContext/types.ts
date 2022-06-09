import { Environment } from 'jai-sdk/dist/tsc/environment-management/environment';
import { ReactNode } from 'react';

export type UsersContextProps = {
  validateAuthToken: (access_token: string) => Promise<{
    isValid: boolean;
    environments: Environment[];
  }>;
  authenticateUser: (
    access_token: string,
    access_environment: string
  ) => Promise<void>;
};

export type UsersProviderProps = {
  children: ReactNode;
};
