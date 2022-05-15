import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AccessDeniedError } from '~/app/domain/errors'

export default function handleSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookieKey = 'eform:account'
    const cookies = parseCookies(context)
    const { [cookieKey]: cookie } = cookies
    const toLogin = {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }

    if (!cookie) {
      return toLogin
    }

    try {
      return await fn(context)
    } catch (error) {
      const isAccessDeniedError = error instanceof AccessDeniedError
      if (isAccessDeniedError) {
        destroyCookie(context, cookieKey)
        return toLogin
      }

      throw error
    }
  }
}
