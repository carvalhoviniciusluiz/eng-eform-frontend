import { GetServerSidePropsContext } from 'next';
import { RemoteGetPeople } from '~/app/application/usecases';
import { GetPeople } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteGetPeople = (
  context?: GetServerSidePropsContext
): GetPeople => {
  return new RemoteGetPeople(
    '/v1/people',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
