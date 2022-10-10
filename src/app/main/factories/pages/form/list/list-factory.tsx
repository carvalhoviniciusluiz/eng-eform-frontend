import { LoadForms } from '~/app/domain/usecases';
import {
  makeRemoteDeleteForm,
  makeRemoteLoadForms
} from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { FormListTag } from '~/app/presentation/pages';

export const makeFormList = (props: LoadForms.Response) => {
  return (
    <BaseLayout>
      <FormListTag
        {...props}
        loadForms={makeRemoteLoadForms()}
        deleteForm={makeRemoteDeleteForm()}
      />
    </BaseLayout>
  );
};
