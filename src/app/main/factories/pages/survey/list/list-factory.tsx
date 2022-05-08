import { FormModel } from '~/app/domain/models'
import { LoadSurveys } from '~/app/domain/usecases'
import {
  makeRemoteDeleteSurvey,
  makeRemoteLoadSurveys
} from '~/app/main/factories/usecases'
import { SurveyListTag } from '~/app/presentation/pages'

export type SurveyListProps = LoadSurveys.Response & {
  parentForm: FormModel
}

export const makeSurveyList = (props: SurveyListProps) => {
  return (
    <SurveyListTag
      {...props}
      loadSurveys={makeRemoteLoadSurveys(props.parentForm.id)}
      deleteSurvey={makeRemoteDeleteSurvey(props.parentForm.id)}
    />
  )
}
