import { RemoteEditSurvey } from '~/app/application/usecases'
import { EditSurvey } from '~/app/domain/usecases'
import { makeAuthorizedHttpPatchClientDecorator } from '~/app/main/factories/decorators'

export const makeRemoteEditSurveys = (
  formId: string,
  context?: any
): EditSurvey => {
  return new RemoteEditSurvey(
    `/v1/forms/${formId}/surveys`,
    makeAuthorizedHttpPatchClientDecorator(context)
  )
}
