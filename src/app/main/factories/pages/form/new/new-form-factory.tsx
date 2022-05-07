import { makeRemoteAddForm } from '~/app/main/factories/usecases'
import { NewFormTag } from '~/app/presentation/pages'
import { makeNewFormValidation } from './new-form-validation-factory'

export const makeNewForm = () => {
  return (
    <NewFormTag
      addForm={makeRemoteAddForm()}
      validation={makeNewFormValidation()}
    />
  )
}
