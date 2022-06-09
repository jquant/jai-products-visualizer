import { Container, Flex } from '@chakra-ui/react';

import { Layout } from '@components/core/layout';
import { ProductsSection } from '@components/products/products-section';

export function ProductsTemplate() {
  return (
    <Layout>
      <Container maxW="container.lg" mb="6">
        <Flex direction="column">
          <ProductsSection database="productimages" />
        </Flex>
      </Container>
    </Layout>
  );
}
