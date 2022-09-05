import { GetForm } from '~/app/domain/usecases';
import { makeRemoteAddPublicForm } from '~/app/main/factories/usecases';
import { PublicFormTag } from '~/app/presentation/pages';

export const makePublicForm = (props: GetForm.Props) => {
  return (
    <PublicFormTag
      {...props}
      addPublicForm={makeRemoteAddPublicForm(props.formId)}
    />
  );
};
