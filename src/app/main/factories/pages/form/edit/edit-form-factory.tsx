import { EditForm } from '~/app/domain/usecases';
import { makeRemoteEditForm } from '~/app/main/factories/usecases';
import { EditFormTag } from '~/app/presentation/pages';
import { makeEditFormValidation } from './edit-form-validation-factory';

export const makeEditForm = (props: EditForm.Props) => {
  return (
    <EditFormTag
      {...props}
      editForm={makeRemoteEditForm()}
      validation={makeEditFormValidation()}
    />
  );
};
