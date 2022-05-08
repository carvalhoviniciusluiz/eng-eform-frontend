import { RemoteAddSurvey } from '~/app/application/usecases'
import { AddSurvey } from '~/app/domain/usecases'
import { makeAuthorizedHttpPostClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteAddSurvey = (
  formId: string,
  context?: any
): AddSurvey => {
  return new RemoteAddSurvey(
    `/v1/forms/${formId}/surveys`,
    makeAuthorizedHttpPostClientDecorator(context)
  )
}
