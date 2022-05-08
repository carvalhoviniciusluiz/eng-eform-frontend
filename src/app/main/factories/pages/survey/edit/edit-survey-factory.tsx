import { FormModel } from '~/app/domain/models'
import { EditSurvey } from '~/app/domain/usecases'
import { makeRemoteEditSurvey } from '~/app/main/factories/usecases'
import { EditSurveyTag } from '~/app/presentation/pages'
import { makeEditSurveyValidation } from './edit-survey-validation-factory'

export type EditSurveyProps = {
  data: EditSurvey.Response
  parentForm: FormModel
}

export const makeEditSurvey = (props: EditSurveyProps) => {
  return (
    <EditSurveyTag
      {...props}
      editSurvey={makeRemoteEditSurvey(props.parentForm.id)}
      validation={makeEditSurveyValidation()}
    />
  )
}
