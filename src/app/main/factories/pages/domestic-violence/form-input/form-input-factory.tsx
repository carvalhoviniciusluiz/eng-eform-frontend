import { GetFormByProcessNumber } from '~/app/domain/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { FormInputTag } from '~/app/presentation/pages';

export const makeFormInput = (props: GetFormByProcessNumber.Output) => {
  return (
    <BaseLayout>
      <FormInputTag ticket={props} />
    </BaseLayout>
  );
};
