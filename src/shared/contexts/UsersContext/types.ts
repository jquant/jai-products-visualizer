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
  validateEnvCollections: (params: {
    collections: string[];
    access_token: string;
    environment: string;
  }) => Promise<boolean>;
};

export type UsersProviderProps = {
  children: ReactNode;
};
