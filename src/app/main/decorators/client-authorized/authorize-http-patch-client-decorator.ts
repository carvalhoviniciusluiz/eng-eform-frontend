import { GetStorage } from '~/app/application/protocols/cache'
import {
  HttpPatchClient,
  HttpPatchParams,
  HttpResponse
} from '~/app/application/protocols/http'

export class AuthorizeHttpPatchClientDecorator implements HttpPatchClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpPatchClient: HttpPatchClient
  ) {}

  async patch(params: HttpPatchParams): Promise<HttpResponse> {
    const account = this.getStorage.get('eform:account')
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          Authorization: `Bearer ${account.accessToken as string}`
        })
      })
    }
    const httpResponse = await this.httpPatchClient.patch(params)
    return httpResponse
  }
}
