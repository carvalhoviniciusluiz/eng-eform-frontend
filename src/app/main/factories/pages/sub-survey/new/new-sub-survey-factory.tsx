import { AddSubSurvey } from '~/app/domain/usecases'
import { makeRemoteAddSubSurvey } from '~/app/main/factories/usecases'
import { NewSubSurveyTag } from '~/app/presentation/pages'
import { makeNewSubSurveyValidation } from './new-sub-survey-validation-factory'

export const makeNewSubSurvey = (props: AddSubSurvey.Props) => {
  return (
    <NewSubSurveyTag
      {...props}
      addSubSurvey={makeRemoteAddSubSurvey(
        props.parentForm.id,
        props.parentSurvey.id
      )}
      validation={makeNewSubSurveyValidation()}
    />
  )
}
