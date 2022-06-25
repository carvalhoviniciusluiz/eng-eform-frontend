import handleSSRNeutral from '~/pages/_handles/handle-ssr-neutral';

export const getServerSideProps = handleSSRNeutral(async context => {
  return {
    props: {}
  };
});

function MainFormPage() {
  return <h1>hello</h1>;
}

export default MainFormPage;
