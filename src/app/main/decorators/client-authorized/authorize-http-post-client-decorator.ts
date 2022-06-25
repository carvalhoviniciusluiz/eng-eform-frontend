import { GetStorage } from '~/app/application/protocols/cache';
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '~/app/application/protocols/http';

export class AuthorizeHttpPostClientDecorator implements HttpPostClient {
  constructor(
    private readonly serviceStorage: GetStorage,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async post(params: HttpPostParams): Promise<HttpResponse> {
    const account = this.serviceStorage.get('eform:account');
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers ?? {}, {
          Authorization: `Bearer ${account.accessToken as string}`
        })
      });
    }
    const httpResponse = await this.httpPostClient.post(params);
    return httpResponse;
  }
}
