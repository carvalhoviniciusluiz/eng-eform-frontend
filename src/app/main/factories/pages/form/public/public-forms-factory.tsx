import { LoadForms } from '~/app/domain/usecases'
import { makeRemoteLoadPublicForms } from '~/app/main/factories/usecases'
import { PublicForms } from '~/app/presentation/pages'

export const makePublicForms = (props: LoadForms.Response) => {
  return <PublicForms {...props} loadForms={makeRemoteLoadPublicForms()} />
}
