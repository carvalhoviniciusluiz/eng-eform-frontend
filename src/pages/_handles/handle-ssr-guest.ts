import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { parseCookies } from 'nookies';

export default function handleSSRGuest<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookieKey = 'eform:account';
    const cookies = parseCookies(context);
    const { [cookieKey]: cookie } = cookies;
    if (cookie) {
      return {
        redirect: {
          destination: '/vdf',
          permanent: false
        }
      };
    }

    return await fn(context);
  };
}
