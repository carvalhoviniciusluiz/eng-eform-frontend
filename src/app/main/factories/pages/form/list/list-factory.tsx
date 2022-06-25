import { LoadForms } from '~/app/domain/usecases';
import {
  makeRemoteDeleteForm,
  makeRemoteLoadForms
} from '~/app/main/factories/usecases';
import { FormListTag } from '~/app/presentation/pages';

export const makeFormList = (props: LoadForms.Response) => {
  return (
    <FormListTag
      {...props}
      loadForms={makeRemoteLoadForms()}
      deleteForm={makeRemoteDeleteForm()}
    />
  );
};
