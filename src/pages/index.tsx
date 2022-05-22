import type { GetServerSideProps, NextPage } from 'next';

import { LoginTemplate } from '@components/templates/login-template';

const Home: NextPage = () => {
  return <LoginTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = ctx.req.cookies['access_token'];

  if (accessToken) {
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
