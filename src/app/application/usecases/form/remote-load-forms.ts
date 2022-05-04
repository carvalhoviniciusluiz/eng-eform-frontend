import { HttpGetClient, HttpStatusCode } from '~/app/application/protocols/http'
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors'
import { LoadForms } from '~/app/domain/usecases'

export class RemoteLoadForms implements LoadForms {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadForms.Response>
  ) { }

  async loadAll(params?: LoadForms.Params): Promise<RemoteLoadForms.Response> {
    const httpResponse = await this.httpGetClient.get({ url: this.url, params })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteLoadForms.Response
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.noContent:
        return {} as RemoteLoadForms.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadForms {
  export type Response = LoadForms.Response
}
