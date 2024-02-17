import { RemoteAddFormInput } from '~/app/application/usecases';
import { AddFormInput } from '~/app/domain/usecases';
import { makeAuthorizedHttpPostClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteAddFormInput = (): AddFormInput => {
  return new RemoteAddFormInput(
    '/v1/form-inputs',
    makeAuthorizedHttpPostClientDecorator()
  );
};
