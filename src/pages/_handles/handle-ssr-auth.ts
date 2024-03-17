import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';

export default function handleSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookieKey = 'eform:account';
    const cookies = parseCookies(context);
    const { [cookieKey]: cookie } = cookies;
    const toLogin = {
      redirect: {
        source: '/',
        destination: '/',
        permanent: false
      }
    };
    if (!cookie) {
      return toLogin;
    }
    try {
      return await fn(context);
    } catch (error) {
      destroyCookie(context, cookieKey);
      return toLogin;
    }
  };
}
