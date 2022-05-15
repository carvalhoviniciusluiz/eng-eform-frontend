import { LoadSurveys } from '~/app/domain/usecases'
import {
  makeRemoteDeleteSurvey,
  makeRemoteLoadSurveys
} from '~/app/main/factories/usecases'
import { SurveyListTag } from '~/app/presentation/pages'

export const makeSurveyList = (props: LoadSurveys.Props) => {
  return (
    <SurveyListTag
      {...props}
      loadSurveys={makeRemoteLoadSurveys(props.parentForm.id)}
      deleteSurvey={makeRemoteDeleteSurvey(props.parentForm.id)}
    />
  )
}
