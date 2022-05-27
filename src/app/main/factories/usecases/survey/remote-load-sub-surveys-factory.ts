import { RemoteLoadSubSurveys } from '~/app/application/usecases'
import { LoadSubSurveys } from '~/app/domain/usecases'
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteLoadSubSurveys = (
  formSlug: string,
  SurveySlug: string,
  context?: any
): LoadSubSurveys => {
  return new RemoteLoadSubSurveys(
    `/v1/forms/${formSlug}/surveys/${SurveySlug}/surveys`,
    makeAuthorizedHttpGetClientDecorator(context)
  )
}
