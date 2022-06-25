import { RemoteDeleteForm } from '~/app/application/usecases';
import { DeleteForm } from '~/app/domain/usecases';
import { makeAuthorizedHttpDeleteClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteDeleteForm = (): DeleteForm => {
  return new RemoteDeleteForm(
    '/v1/forms',
    makeAuthorizedHttpDeleteClientDecorator()
  );
};
