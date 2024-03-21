import { GetFormByProcessNumber } from '~/app/domain/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { FormInputTag } from '~/app/presentation/pages';

type Props = {
  ticket: GetFormByProcessNumber.Output;
  forms: GetFormByProcessNumber.Form[];
};

export const makeFormInput = (props: Props) => {
  return (
    <BaseLayout>
      <FormInputTag ticket={props.ticket} forms={props.forms} />
    </BaseLayout>
  );
};
