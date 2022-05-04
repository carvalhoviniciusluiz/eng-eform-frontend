import { RemoteEditForm } from '~/app/application/usecases'
import { EditForm } from '~/app/domain/usecases'
import { makeAuthorizedHttpPatchClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteEditForm = (): EditForm => {
  return new RemoteEditForm(
    '/v1/forms',
    makeAuthorizedHttpPatchClientDecorator()
  )
}
