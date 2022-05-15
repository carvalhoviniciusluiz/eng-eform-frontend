import { AddSurvey } from '~/app/domain/usecases'
import { makeRemoteAddSurvey } from '~/app/main/factories/usecases'
import { NewSurveyTag } from '~/app/presentation/pages'
import { makeNewSurveyValidation } from './new-survey-validation-factory'

export const makeNewSurvey = (props: AddSurvey.Props) => {
  return (
    <NewSurveyTag
      {...props}
      addSurvey={makeRemoteAddSurvey(props.parentForm.id)}
      validation={makeNewSurveyValidation()}
    />
  )
}
