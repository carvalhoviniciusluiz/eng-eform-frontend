import { RemoteAddForm } from '~/app/application/usecases';
import { AddForm } from '~/app/domain/usecases';
import { makeAuthorizedHttpPostClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteAddForm = (): AddForm => {
  return new RemoteAddForm(
    '/v1/forms',
    makeAuthorizedHttpPostClientDecorator()
  );
};
