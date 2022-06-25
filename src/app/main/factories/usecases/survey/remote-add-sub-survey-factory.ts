import { RemoteAddSubSurvey } from '~/app/application/usecases';
import { AddSubSurvey } from '~/app/domain/usecases';
import { makeAuthorizedHttpPostClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteAddSubSurvey = (
  formSlug: string,
  SurveySlug: string,
  context?: any
): AddSubSurvey => {
  return new RemoteAddSubSurvey(
    `/v1/forms/${formSlug}/surveys/${SurveySlug}/surveys`,
    makeAuthorizedHttpPostClientDecorator(context)
  );
};
