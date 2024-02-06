import { GetServerSidePropsContext } from 'next';
import { RemoteLoadFullForms } from '~/app/application/usecases';
import { LoadFullForms } from '~/app/domain/usecases';
import { makeAuthorizedHttpGetClientDecorator } from '~/app/main/factories/decorators';

export const makeRemoteLoadFullForms = (
  context?: GetServerSidePropsContext
): LoadFullForms => {
  return new RemoteLoadFullForms(
    '/v1/forms/full',
    makeAuthorizedHttpGetClientDecorator(context)
  );
};
