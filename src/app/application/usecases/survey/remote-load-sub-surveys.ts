import { HttpGetClient, HttpStatusCode } from '~/app/application/protocols/http'
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors'
import { LoadSubSurveys } from '~/app/domain/usecases'

export class RemoteLoadSubSurveys implements LoadSubSurveys {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSubSurveys.Response>
  ) {}

  async loadAll(
    params?: LoadSubSurveys.Params
  ): Promise<RemoteLoadSubSurveys.Response> {
    const httpResponse = await this.httpGetClient.get({ url: this.url, params })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteLoadSubSurveys.Response
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.noContent:
        return {} as RemoteLoadSubSurveys.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSubSurveys {
  export type Response = LoadSubSurveys.Response
}
