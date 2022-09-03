import { GetForm } from '~/app/domain/usecases';
import { PublicFormTag } from '~/app/presentation/pages';

export const makePublicForm = (props: GetForm.Props) => {
  return <PublicFormTag {...props} />;
};
