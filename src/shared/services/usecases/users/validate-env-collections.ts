import { authenticate, setEnvironment, getDatabaseInfo } from 'jai-sdk';
export class ValidateEnvCollections {
  static async execute(params: {
    collections: string[];
    access_token: string;
    environment: string;
  }) {
    authenticate(params.access_token);
    setEnvironment(params.environment);

    const dbs = (await getDatabaseInfo('names')) as unknown as string[];

    for (const collection of params.collections) {
      if (!dbs.includes(collection)) {
        return false;
      }
    }

    return true;
  }
}
