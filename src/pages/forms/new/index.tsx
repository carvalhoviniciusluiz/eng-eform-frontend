import { makeNewForm } from '~/app/main/factories/pages'
import { BaseLayout } from '~/app/presentation/layouts'
import handleSSRAuth from '~/pages/_handles/handle-ssr-auth'

export const getServerSideProps = handleSSRAuth(async () => {
  return {
    props: {}
  }
})

function NewProductFormPage() {
  return <BaseLayout>{makeNewForm()}</BaseLayout>
}

export default NewProductFormPage
