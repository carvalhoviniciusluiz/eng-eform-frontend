import { GetServerSidePropsContext } from 'next';
import { RemoteGetForm } from '~/app/application/usecases';
import { GetForm } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteGetForm = (
  context?: GetServerSidePropsContext
): GetForm => {
  return new RemoteGetForm(
    '/v1/forms',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
