import { useCallback, useEffect, useState } from 'react';
import { Container, Flex, Skeleton, Text, Grid } from '@chakra-ui/react';

import { Layout } from '@components/core/layout';
import { ProductBox } from '@components/products/product-box';

import { useProducts } from '@shared/hooks/useProducts';
import { ProductProps } from '@shared/services/usecases/products/get-products/types';
import { useLocale } from '@shared/hooks/useLocale';

export function ProductsTemplate() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [productsLimit, setProductsLimit] = useState(40);

  const { fetchProducts } = useProducts();
  const { locale } = useLocale();

  const handleShowMoreProducts = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.body.getBoundingClientRect().height;

    if (scrollPosition >= pageHeight - 150) {
      setProductsLimit(productsLimit + 20);
    }
  }, [productsLimit]);

  useEffect(() => {
    window.addEventListener('scroll', handleShowMoreProducts);

    return () => {
      window.removeEventListener('scroll', handleShowMoreProducts);
    };
  }, [handleShowMoreProducts]);

  useEffect(() => {
    async function handle() {
      const products = await fetchProducts({
        limit: productsLimit,
      });

      if (products) {
        setProducts(products.items);
      }
    }

    void handle();
  }, [fetchProducts, productsLimit]);

  return (
    <Layout>
      <Container maxW="container.lg" mb="6">
        <Flex direction="column" gridGap={6}>
          <Skeleton isLoaded={products.length > 0} w="64">
            <Text fontWeight="semibold">{locale.products.title}</Text>
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
              products.map((product) => (
                <ProductBox key={product.article_id} product={product} />
              ))
            ) : (
              <>
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
                <Skeleton h="72" />
              </>
            )}
          </Grid>
        </Flex>
      </Container>
    </Layout>
  );
}
