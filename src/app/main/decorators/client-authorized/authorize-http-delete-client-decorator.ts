import { GetStorage } from '~/app/application/protocols/cache';
import {
  HttpDeleteClient,
  HttpDeleteParams,
  HttpResponse
} from '~/app/application/protocols/http';

export class AuthorizeHttpDeleteClientDecorator implements HttpDeleteClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpDeleteClient: HttpDeleteClient
  ) {}

  async delete(params: HttpDeleteParams): Promise<HttpResponse> {
    const account = this.getStorage.get('eform:account');
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          Authorization: `Bearer ${account.accessToken as string}`
        })
      });
    }
    const httpResponse = await this.httpDeleteClient.delete(params);
    return httpResponse;
  }
}
