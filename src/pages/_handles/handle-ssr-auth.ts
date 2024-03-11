import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AccessDeniedError, UnauthorizedError } from '~/app/domain/errors';

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
        destination: '/login',
        permanent: false
      }
    };
    if (!cookie) {
      return toLogin;
    }
    try {
      return await fn(context);
    } catch (error) {
      const isAccessDeniedError = error instanceof AccessDeniedError;
      const isUnauthorizedError = error instanceof UnauthorizedError;
      if (isAccessDeniedError || isUnauthorizedError) {
        destroyCookie(context, cookieKey);
        return toLogin;
      }
      throw error;
    }
  };
}
