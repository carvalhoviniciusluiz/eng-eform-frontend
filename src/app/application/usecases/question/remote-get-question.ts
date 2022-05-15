import { HttpGetClient, HttpStatusCode } from '~/app/application/protocols/http'
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors'
import { GetQuestion } from '~/app/domain/usecases'

export class RemoteGetQuestion implements GetQuestion {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteGetQuestion.Response>
  ) { }

  async get(id: string): Promise<RemoteGetQuestion.Response> {
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}/${id}`
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteGetQuestion.Response
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.noContent:
        return {} as RemoteGetQuestion.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteGetQuestion {
  export type Response = GetQuestion.Response
}
