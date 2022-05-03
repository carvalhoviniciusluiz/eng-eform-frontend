import { makeRemoteAuthenticationDecorator } from '~/app/main/factories/decorators'
import { makeLoginValidation } from '~/app/main/factories/pages'
import { Login } from '~/app/presentation/pages'

export const makeLogin = () => {
  return (
    <Login
      validation={makeLoginValidation()}
      authentication={makeRemoteAuthenticationDecorator()}
    />
  )
}
