import { GetServerSidePropsContext } from 'next';
import { RemoteGetFormByProcessNumber } from '~/app/application/usecases';
import { GetFormByProcessNumber } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteGetFormByProcessNumber = (
  context?: GetServerSidePropsContext
): GetFormByProcessNumber => {
  return new RemoteGetFormByProcessNumber(
    '/v1/form-inputs',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
