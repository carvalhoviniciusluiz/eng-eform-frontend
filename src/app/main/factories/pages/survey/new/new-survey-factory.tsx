import { FormModel } from '~/app/domain/models'
import { makeRemoteAddSurvey } from '~/app/main/factories/usecases'
import { NewSurveyTag } from '~/app/presentation/pages'
import { makeNewSurveyValidation } from './new-survey-validation-factory'

export type NewSurveyProps = {
  parentForm: FormModel
}

export const makeNewSurvey = (props: NewSurveyProps) => {
  return (
    <NewSurveyTag
      {...props}
      addSurvey={makeRemoteAddSurvey(props.parentForm.id)}
      validation={makeNewSurveyValidation()}
    />
  )
}
