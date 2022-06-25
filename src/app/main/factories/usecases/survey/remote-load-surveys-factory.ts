import { RemoteLoadSurveys } from '~/app/application/usecases';
import { LoadSurveys } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteLoadSurveys = (
  formSlug: string,
  context?: any
): LoadSurveys => {
  return new RemoteLoadSurveys(
    `/v1/forms/${formSlug}/surveys`,
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
