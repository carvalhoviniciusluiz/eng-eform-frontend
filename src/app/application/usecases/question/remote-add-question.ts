import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http'
import { UnexpectedError } from '~/app/domain/errors'
import { AddQuestion } from '~/app/domain/usecases'

export class RemoteAddQuestion implements AddQuestion {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      RemoteAddQuestion.Params,
      RemoteAddQuestion.Response
    >
  ) { }

  async add(
    params: RemoteAddQuestion.Params
  ): Promise<RemoteAddQuestion.Response> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteAddQuestion.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddQuestion {
  export type Params = AddQuestion.Params
  export type Response = AddQuestion.Response
}
