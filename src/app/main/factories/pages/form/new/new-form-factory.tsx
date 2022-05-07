import { makeRemoteAddForm } from '~/app/main/factories/usecases'
import { NewForm } from '~/app/presentation/pages'
import { makeNewFormValidation } from './new-form-validation-factory'

export const makeNewForm = () => {
  return (
    <NewForm
      addForm={makeRemoteAddForm()}
      validation={makeNewFormValidation()}
    />
  )
}
