import {
  HttpPatchClient,
  HttpStatusCode
} from '~/app/application/protocols/http'
import { UnexpectedError } from '~/app/domain/errors'
import { EditQuestion } from '~/app/domain/usecases'

export class RemoteEditQuestion implements EditQuestion {
  constructor(
    private readonly url: string,
    private readonly httpPatchClient: HttpPatchClient<
      RemoteEditQuestion.Params,
      RemoteEditQuestion.Response
    >
  ) { }

  async edit(
    id: string,
    params: RemoteEditQuestion.Params
  ): Promise<RemoteEditQuestion.Response> {
    const httpResponse = await this.httpPatchClient.patch({
      url: `${this.url}/${id}`,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteEditQuestion.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteEditQuestion {
  export type Params = EditQuestion.Params
  export type Response = EditQuestion.Response
}
