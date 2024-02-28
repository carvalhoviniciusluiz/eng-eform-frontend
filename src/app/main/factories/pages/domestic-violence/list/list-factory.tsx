import { GetFormInputProtocols, GetPeople } from '~/app/domain/usecases';
import { makeRemoteGetFormInputs } from '~/app/main/factories/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { ListDomesticViolenceTag } from '~/app/presentation/pages';

type Props = {
  data: {
    protocols: GetFormInputProtocols.Output[];
    victims: GetPeople.Output[];
    aggressors: GetPeople.Output[];
  };
};

export const makeListDomesticViolence = (props: Props) => {
  return (
    <BaseLayout>
      <ListDomesticViolenceTag
        {...props}
        getFormInputs={makeRemoteGetFormInputs()}
      />
    </BaseLayout>
  );
};
