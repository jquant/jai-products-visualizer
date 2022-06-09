import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Container, Flex, Grid, Skeleton, Text } from '@chakra-ui/react';

import { ErrorBox } from '@components/core/error';
import { Layout } from '@components/core/layout';
import { ProductBox } from '@components/products/product-box';

import { useLocale } from '@shared/hooks/useLocale';
import { useUsers } from '@shared/hooks/useUsers';
import { useProducts } from '@shared/hooks/useProducts';

export function ProductsTemplate() {
  const [products, setProducts] = useState<number[]>([]);
  const [error, setError] = useState(false);

  const { fetchProducts } = useProducts();
  const { locale } = useLocale();

  const [productsDisplayQuantity, setProductsDisplayQuantity] = useState(16);

  const handleShowMoreProducts = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.body.getBoundingClientRect().height;

    if (scrollPosition >= pageHeight - 150) {
      setProductsDisplayQuantity(productsDisplayQuantity + 8);
    }
  }, [productsDisplayQuantity]);

  useEffect(() => {
    window.addEventListener('scroll', handleShowMoreProducts);

    return () => {
      window.removeEventListener('scroll', handleShowMoreProducts);
    };
  }, [handleShowMoreProducts]);

  useEffect(() => {
    async function fetch() {
      const items = await fetchProducts('productimages');

      if (items) {
        setProducts(items);
      } else setError(true);
    }

    void fetch();
  }, [fetchProducts]);

  if (error) {
    return <ErrorBox />;
  }

  return (
    <Layout>
      <Container maxW="container.lg" mb="6">
        <Flex direction="column" gridGap={6}>
          <Skeleton isLoaded={products.length > 0} w="64">
            <Text fontWeight="semibold">
              {locale.products.title} ({products.length})
            </Text>
          </Skeleton>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
            gridGap={8}
          >
            {products.length > 0 ? (
              products
                .slice(0, productsDisplayQuantity)
                .map((id) => <ProductBox key={id} productId={id} />)
            ) : (
              <>
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
                <Skeleton h="64" />
              </>
            )}
          </Grid>
        </Flex>
      </Container>
    </Layout>
  );
}
