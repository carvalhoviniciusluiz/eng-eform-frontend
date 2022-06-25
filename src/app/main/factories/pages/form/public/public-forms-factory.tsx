import { LoadForms } from '~/app/domain/usecases';
import { makeRemoteLoadPublicForms } from '~/app/main/factories/usecases';
import { PublicFormsTag } from '~/app/presentation/pages';

export const makePublicForms = (props: LoadForms.Response) => {
  return <PublicFormsTag {...props} loadForms={makeRemoteLoadPublicForms()} />;
};
