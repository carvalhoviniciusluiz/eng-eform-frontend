import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';

export default function handleSSRNeutral<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    // something here..

    return await fn(context);
  };
}
