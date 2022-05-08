import { RemoteGetSurvey } from '~/app/application/usecases'
import { GetSurvey } from '~/app/domain/usecases'
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteGetSurvey = (
  formId: string,
  context?: any
): GetSurvey => {
  return new RemoteGetSurvey(
    `/v1/forms/${formId}/surveys`,
    makeAuthorizedHttpGetClientDecorator(context)
  )
}
