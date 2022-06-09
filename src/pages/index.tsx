import type { GetServerSideProps, NextPage } from 'next';

import { LoginTemplate } from '@components/templates/login-template';

const Home: NextPage = () => {
  return <LoginTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const clientSession = ctx.req.cookies['client_session'];

  if (clientSession) {
    return {
      redirect: {
        permanent: false,
        destination: '/products',
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
