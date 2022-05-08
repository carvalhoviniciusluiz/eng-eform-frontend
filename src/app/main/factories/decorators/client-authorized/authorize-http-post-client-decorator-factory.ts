import { HttpPostClient } from '~/app/application/protocols/http'
import { AuthorizeHttpPostClientDecorator } from '~/app/main/decorators'
import { makeCookieAdapter } from '~/app/main/factories/cache'
import { makeAxiosHttpClient } from '~/app/main/factories/http'

export const makeAuthorizedHttpPostClientDecorator = (
  context?: any
): HttpPostClient => {
  return new AuthorizeHttpPostClientDecorator(
    makeCookieAdapter(context),
    makeAxiosHttpClient(context)
  )
}
