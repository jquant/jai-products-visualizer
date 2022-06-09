import { GetServerSideProps, NextPage } from 'next';

import { ProductTemplate } from '@components/templates/product-template';

const ProductDetails: NextPage<{
  productId: number;
}> = ({ productId }) => {
  return <ProductTemplate productId={productId} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const clientSession = ctx.req.cookies['client_session'];
  const productId = ctx.params?.id;

  if (!clientSession) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      productId,
    },
  };
};

export default ProductDetails;
