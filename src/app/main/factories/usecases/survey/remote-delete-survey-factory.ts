import { RemoteDeleteSurvey } from '~/app/application/usecases';
import { DeleteSurvey } from '~/app/domain/usecases';
import { makeAuthorizedHttpDeleteClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteDeleteSurvey = (formSlug: string): DeleteSurvey => {
  return new RemoteDeleteSurvey(
    `/v1/forms/${formSlug}/surveys`,
    makeAuthorizedHttpDeleteClientDecorator()
  );
};
