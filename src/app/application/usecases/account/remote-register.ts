import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http'
import { UnexpectedError } from '~/app/domain/errors'
import { Register } from '~/app/domain/usecases'

export class RemoteRegister implements Register {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      RemoteRegister.Params,
      RemoteRegister.Response
    >
  ) {}

  async signUp(
    params: RemoteRegister.Params
  ): Promise<RemoteRegister.Response> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteRegister.Response
      default: {
        const {
          body: { errors }
        } = httpResponse?.body as any
        throw new UnexpectedError(errors)
      }
    }
  }
}

export namespace RemoteRegister {
  export type Params = Register.Params
  export type Response = Register.Response
}
