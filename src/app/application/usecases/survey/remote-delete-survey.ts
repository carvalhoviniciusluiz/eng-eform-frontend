import {
  HttpDeleteClient,
  HttpStatusCode
} from '~/app/application/protocols/http'
import { UnexpectedError } from '~/app/domain/errors'
import { DeleteSurvey } from '~/app/domain/usecases'

export class RemoteDeleteSurvey implements DeleteSurvey {
  constructor(
    private readonly url: string,
    private readonly httpDeleteClient: HttpDeleteClient<RemoteDeleteSurvey.Response>
  ) { }

  async delete(id: string): Promise<RemoteDeleteSurvey.Response> {
    const httpResponse = await this.httpDeleteClient.delete({
      url: `${this.url}/${id}`
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteDeleteSurvey.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteDeleteSurvey {
  export type Response = DeleteSurvey.Response
}
