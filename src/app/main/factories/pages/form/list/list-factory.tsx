import { LoadForms } from '~/app/domain/usecases'
import {
  makeRemoteDeleteForm,
  makeRemoteLoadForms
} from '~/app/main/factories/usecases'
import { FormList } from '~/app/presentation/pages'

export const makeFormList = (props: LoadForms.Response) => {
  return (
    <FormList
      {...props}
      loadForms={makeRemoteLoadForms()}
      deleteForm={makeRemoteDeleteForm()}
    />
  )
}
