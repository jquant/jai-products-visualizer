import { GetServerSideProps, NextPage } from 'next';

import { ProductsTemplate } from '@components/templates/products-template';

export type ProductsProps = {
  items: number[];
  error: boolean;
};

const Products: NextPage<ProductsProps> = () => {
  return <ProductsTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = ctx.req.cookies['access_token'];

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};

export default Products;
