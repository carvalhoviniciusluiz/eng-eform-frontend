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
      RemoteAddQuestion.RequestParams,
      RemoteAddQuestion.Response
    >
  ) { }

  async add(
    params: RemoteAddQuestion.FormParams
  ): Promise<RemoteAddQuestion.Response> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: {
        content: params.content,
        answers: {
          type: params.answerType,
          data: params.answers
        }
      }
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
  export type FormParams = AddQuestion.FormParams
  export type RequestParams = AddQuestion.RequestParams
  export type Response = AddQuestion.Response
}
