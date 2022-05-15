import { EditSurvey } from '~/app/domain/usecases'
import { makeRemoteEditSurvey } from '~/app/main/factories/usecases'
import { EditSurveyTag } from '~/app/presentation/pages'
import { makeEditSurveyValidation } from './edit-survey-validation-factory'

export const makeEditSurvey = (props: EditSurvey.Props) => {
  return (
    <EditSurveyTag
      {...props}
      editSurvey={makeRemoteEditSurvey(props.parentForm.id)}
      validation={makeEditSurveyValidation()}
    />
  )
}
