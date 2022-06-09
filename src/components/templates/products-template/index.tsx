import { Container, Flex } from '@chakra-ui/react';

import { Layout } from '@components/core/layout';
import { ProductsSection } from '@components/products/products-section';

export function ProductsTemplate() {
  const databases = ['productimages', 'hm_images'];

  return (
    <Layout>
      <Container maxW="container.lg" mb="6">
        <Flex direction="column" gridGap={16}>
          {databases.map((name, index) => (
            <ProductsSection key={name + '-' + index} database={name} />
          ))}
        </Flex>
      </Container>
    </Layout>
  );
}
