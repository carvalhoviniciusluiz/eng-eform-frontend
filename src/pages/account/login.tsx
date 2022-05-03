import { makeLogin } from '~/app/main/factories/pages'
import { DefaultLayout } from '~/app/presentation/layouts'
import handleSSRGuest from '~/pages/_handles/handle-ssr-guest'

export const getServerSideProps = handleSSRGuest(async () => {
  return {
    props: {}
  }
})

function LoginPage() {
  return <DefaultLayout>{makeLogin()}</DefaultLayout>
}

export default LoginPage
