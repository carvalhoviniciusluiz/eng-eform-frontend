import { RemoteEditSurvey } from '~/app/application/usecases';
import { EditSurvey } from '~/app/domain/usecases';
import { makeAuthorizedHttpPatchClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteEditSurvey = (
  formSlug: string,
  context?: any
): EditSurvey => {
  return new RemoteEditSurvey(
    `/v1/forms/${formSlug}/surveys`,
    makeAuthorizedHttpPatchClientDecorator(context)
  );
};
