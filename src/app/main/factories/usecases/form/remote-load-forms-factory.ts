import { GetServerSidePropsContext } from 'next';
import { RemoteLoadForms } from '~/app/application/usecases';
import { LoadForms } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteLoadForms = (
  context?: GetServerSidePropsContext
): LoadForms => {
  return new RemoteLoadForms(
    '/v1/forms',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
