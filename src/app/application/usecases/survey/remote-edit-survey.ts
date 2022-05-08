import {
  HttpPatchClient,
  HttpStatusCode
} from '~/app/application/protocols/http'
import { UnexpectedError } from '~/app/domain/errors'
import { EditSurvey } from '~/app/domain/usecases'

export class RemoteEditSurvey implements EditSurvey {
  constructor(
    private readonly url: string,
    private readonly httpPatchClient: HttpPatchClient<
      RemoteEditSurvey.Params,
      RemoteEditSurvey.Response
    >
  ) { }

  async edit(
    id: string,
    params: RemoteEditSurvey.Params
  ): Promise<RemoteEditSurvey.Response> {
    const httpResponse = await this.httpPatchClient.patch({
      url: `${this.url}/${id}`,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteEditSurvey.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteEditSurvey {
  export type Params = EditSurvey.Params
  export type Response = EditSurvey.Response
}
