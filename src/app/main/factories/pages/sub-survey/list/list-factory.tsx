import { LoadSubSurveys } from '~/app/domain/usecases'
import {
  makeRemoteDeleteSurvey,
  makeRemoteLoadSubSurveys
} from '~/app/main/factories/usecases'
import { SubSurveyListTag } from '~/app/presentation/pages'

export const makeSubSurveyList = (props: LoadSubSurveys.Props) => {
  return (
    <SubSurveyListTag
      {...props}
      loadSubSurveys={makeRemoteLoadSubSurveys(
        props.parentForm.id,
        props.parentSurvey.id
      )}
      deleteSurvey={makeRemoteDeleteSurvey(props.parentForm.id)}
    />
  )
}
