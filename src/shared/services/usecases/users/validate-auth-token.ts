import { authenticate, getEnvironments } from 'jai-sdk';
export class ValidateAuthToken {
  static async execute(access_token: string) {
    const { status } = await fetch(
      `https://mycelia.azure-api.net/validation/productimages`,
      {
        headers: {
          Auth: access_token,
        },
      }
    );

    if (status === 200) {
      authenticate(access_token);

      const environments = await getEnvironments();

      return {
        isValid: true,
        environments,
      };
    }

    return {
      isValid: false,
      environments: [],
    };
  }
}
