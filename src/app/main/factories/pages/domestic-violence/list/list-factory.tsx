import { BaseLayout } from '~/app/presentation/layouts';
import { ListDomesticViolenceTag } from '~/app/presentation/pages';

export const makeListDomesticViolence = (props: { data: any }) => {
  return (
    <BaseLayout>
      <ListDomesticViolenceTag />
    </BaseLayout>
  );
};
