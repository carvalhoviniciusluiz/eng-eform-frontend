import {
  HttpPatchClient,
  HttpStatusCode
} from '~/app/application/protocols/http'
import { UnexpectedError } from '~/app/domain/errors'
import { EditForm } from '~/app/domain/usecases'

export class RemoteEditForm implements EditForm {
  constructor(
    private readonly url: string,
    private readonly httpPatchClient: HttpPatchClient<
      RemoteEditForm.Params,
      RemoteEditForm.Response
    >
  ) { }

  async edit(
    id: string,
    params: RemoteEditForm.Params
  ): Promise<RemoteEditForm.Response> {
    const httpResponse = await this.httpPatchClient.patch({
      url: `${this.url}/${id}`,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteEditForm.Response
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteEditForm {
  export type Params = EditForm.Params
  export type Response = EditForm.Response
}
