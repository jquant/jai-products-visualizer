import { authenticate, getDatabaseInfo } from 'jai-sdk';

import { getSessionData } from '@shared/utils/get-session-data';

export class GetDatabasesName {
  static async execute(): Promise<string[] | null> {
    const client = getSessionData();

    if (!client) {
      return null;
    }

    try {
      const response = (await getDatabaseInfo('names')) as unknown as string[];

      return response;
    } catch (e) {
      return null;
    }
  }
}
