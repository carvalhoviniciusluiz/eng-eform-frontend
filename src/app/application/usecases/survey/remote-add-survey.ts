import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http'
import { UnexpectedError } from '~/app/domain/errors'
import { AddSurvey } from '~/app/domain/usecases'

export class RemoteAddSurvey implements AddSurvey {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      RemoteAddSurvey.Params,
      RemoteAddSurvey.Response
    >
  ) { }

  async add(params: RemoteAddSurvey.Params): Promise<RemoteAddSurvey.Response> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteAddSurvey.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddSurvey {
  export type Params = AddSurvey.Params
  export type Response = AddSurvey.Response
}
