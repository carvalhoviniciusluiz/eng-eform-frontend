import { RemotePostFormInputByProcessNumber } from '~/app/application/usecases';
import { PostFormInputByProcessNumber } from '~/app/domain/usecases';
import { makeAuthorizedHttpPostClientDecorator } from '~/app/main/factories/decorators';

export const makeRemotePostFormInputByProcessNumber =
  (): PostFormInputByProcessNumber => {
    return new RemotePostFormInputByProcessNumber(
      '/v1/form-inputs',
      makeAuthorizedHttpPostClientDecorator()
    );
  };
