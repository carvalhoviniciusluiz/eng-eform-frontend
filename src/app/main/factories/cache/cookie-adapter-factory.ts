import { GetStorage, SetStorage } from '~/app/application/protocols/cache'
import { CookieAdapter } from '~/app/infra/cache'

export const makeCookieAdapter = (context?: any): SetStorage & GetStorage => {
  return new CookieAdapter(context)
}
