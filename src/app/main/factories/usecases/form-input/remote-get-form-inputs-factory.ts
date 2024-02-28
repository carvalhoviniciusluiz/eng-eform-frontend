import { GetServerSidePropsContext } from 'next';
import { RemoteGetFormInputs } from '~/app/application/usecases';
import { GetFormInputs } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteGetFormInputs = (
  context?: GetServerSidePropsContext
): GetFormInputs => {
  return new RemoteGetFormInputs(
    '/v1/form-inputs',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
