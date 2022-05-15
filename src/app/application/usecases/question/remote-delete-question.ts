import {
  HttpDeleteClient,
  HttpStatusCode
} from '~/app/application/protocols/http'
import { UnexpectedError } from '~/app/domain/errors'
import { DeleteQuestion } from '~/app/domain/usecases'

export class RemoteDeleteQuestion implements DeleteQuestion {
  constructor(
    private readonly url: string,
    private readonly httpDeleteClient: HttpDeleteClient<RemoteDeleteQuestion.Response>
  ) { }

  async delete(id: string): Promise<RemoteDeleteQuestion.Response> {
    const httpResponse = await this.httpDeleteClient.delete({
      url: `${this.url}/${id}`
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteDeleteQuestion.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteDeleteQuestion {
  export type Response = DeleteQuestion.Response
}
