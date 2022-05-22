import { GetServerSideProps, NextPage } from 'next';

import { ProductTemplate } from '@components/templates/product-template';

import { GetSimilarProducts } from '@shared/services/usecases/products';

const ProductDetails: NextPage<{
  productId: number;
}> = ({ productId }) => {
  return <ProductTemplate productId={productId} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = ctx.req.cookies['access_token'];
  const productId = ctx.params?.id;

  if (!accessToken) {
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
