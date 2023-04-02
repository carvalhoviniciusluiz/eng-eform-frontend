import { GetServerSidePropsContext } from 'next';
import { RemoteGetFormStats } from '~/app/application/usecases';
import { GetFormStats } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteGetFormStats = (
  context?: GetServerSidePropsContext
): GetFormStats => {
  return new RemoteGetFormStats(
    '/v1/forms',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
