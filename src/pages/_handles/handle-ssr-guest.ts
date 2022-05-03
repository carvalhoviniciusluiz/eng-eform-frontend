import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'

export default function handleSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)
    const { 'eform:account': cookie } = cookies

    if (cookie) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return await fn(context)
  }
}
