import { makeRegisterValidation } from '~/app/main/factories/pages'
import { makeRemoteRegister } from '~/app/main/factories/usecases'
import { Register } from '~/app/presentation/pages'

export const makeRegister = () => {
  return (
    <Register
      validation={makeRegisterValidation()}
      register={makeRemoteRegister()}
    />
  )
}
