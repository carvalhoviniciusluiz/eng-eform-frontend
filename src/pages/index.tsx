import { LoadForms } from '~/app/domain/usecases'
import { makePublicForms } from '~/app/main/factories/pages/form/public/public-forms-factory'
import { makeRemoteLoadPublicForms } from '~/app/main/factories/usecases'
import { BaseLayout } from '~/app/presentation/layouts'
import handleSSRNeutral from '~/pages/_handles/handle-ssr-neutral'

export const getServerSideProps = handleSSRNeutral<LoadForms.Response>(
  async (context) => {
    const loadForms = makeRemoteLoadPublicForms(context)
    const httpResponse = await loadForms.loadAll()
    return {
      props: httpResponse
    }
  }
)

function MainPage(props: LoadForms.Response) {
  return <BaseLayout>{makePublicForms({ ...props })}</BaseLayout>
}

export default MainPage
