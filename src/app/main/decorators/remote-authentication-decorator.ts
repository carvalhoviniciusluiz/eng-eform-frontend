import { SetStorage } from '~/app/application/protocols/cache'
import { Authentication } from '~/app/domain/usecases'

export class RemoteAuthenticationDecorator implements Authentication {
  constructor(
    private readonly setStorage: SetStorage,
    private readonly remoteAuthentication: Authentication
  ) {}

  async signIn(
    params: Authentication.Params
  ): Promise<Authentication.Response> {
    const httpResponse = await this.remoteAuthentication.signIn(params)
    this.setStorage.set('eform:account', httpResponse)
    return httpResponse
  }
}
