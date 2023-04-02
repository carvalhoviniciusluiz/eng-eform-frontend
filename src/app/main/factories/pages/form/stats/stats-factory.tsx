import { GetFormStats } from '~/app/domain/usecases';
import { BaseLayout } from '~/app/presentation/layouts';
import { FormStatsTag } from '~/app/presentation/pages';

export const makeFormStats = (props: GetFormStats.ApiResponse) => {
  return (
    <BaseLayout>
      <FormStatsTag {...props} />
    </BaseLayout>
  );
};
