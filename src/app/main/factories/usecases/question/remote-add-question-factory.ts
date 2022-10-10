import { RemoteAddQuestion } from '~/app/application/usecases';
import { AddQuestion } from '~/app/domain/usecases';
import { makeAuthorizedHttpPostClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteAddQuestion = (
  surveySlug: string,
  context?: any
): AddQuestion => {
  return new RemoteAddQuestion(
    `/v1/forms/${surveySlug}/questions`,
    makeAuthorizedHttpPostClientDecorator(context)
  );
};
