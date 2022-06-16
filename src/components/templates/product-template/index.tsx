import { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { FiHeart, FiShoppingCart } from 'react-icons/fi';

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';

import { ErrorBox } from '@components/core/error';
import { Layout } from '@components/core/layout';
import { ProductsSection } from '@components/products/products-section';

import { useLocale } from '@shared/hooks/useLocale';
import { useProducts } from '@shared/hooks/useProducts';
import { useUsers } from '@shared/hooks/useUsers';

import { getImageUrl } from '@shared/utils/get-image-url';
import { ProductProps } from '@shared/services/usecases/products/get-products/types';

import { ProductTemplateProps } from './types';

export function ProductTemplate({ productId }: ProductTemplateProps) {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState(false);

  const { locale } = useLocale();
  const { accessToken } = useUsers();
  const { fetchSimilarProducts, fetchProducts } = useProducts();

  function renderSectionLoadingTemplate() {
    return (
      <Flex direction="column" gap={6}>
        <Skeleton variant="text" height={10} />
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={8}
        >
          {Array.from({ length: 4 }, (_, index) => (
            <GridItem key={index}>
              <Skeleton height={300} width="full" />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    );
  }

  useEffect(() => {
    async function fetch() {
      const findProduct = await fetchProducts({
        filter: {
          article_id: Number(productId),
        },
      });

      if (findProduct) {
        setProduct(findProduct.items[0]);
      } else setError(true);
    }

    void fetch();
  }, [fetchProducts, productId]);

  useEffect(() => {
    async function fetch() {
      const itemsSimilarity = await fetchSimilarProducts({
        database: 'hm_imgs',
        ids: [productId],
      });

      try {
        if (itemsSimilarity) {
          const findProducts = await fetchProducts({
            filter: {
              $or: itemsSimilarity.map((id) => ({
                article_id: Number(id),
              })),
            },
          });

          if (findProducts) {
            setSimilarProducts(findProducts.items);
          }
        }
      } catch {
        setError(true);
      }
    }

    void fetch();
  }, [accessToken, fetchSimilarProducts, productId, fetchProducts]);

  if (error) {
    return <ErrorBox />;
  }

  return (
    <Layout>
      <Container
        as="section"
        maxW="container.lg"
        experimental_spaceY={8}
        mb={16}
      >
        <Flex
          direction={{
            base: 'column',
            md: 'row',
          }}
          alignItems="flex-start"
          gridGap={8}
        >
          <Skeleton
            flex={{
              base: 'auto',
              md: '1',
            }}
            isLoaded={similarProducts.length > 0}
            height={{
              base: 'xs',
              md: 'lg',
            }}
            w="full"
            position="relative"
          >
            <Box
              w="full"
              h="full"
              borderRadius="8px"
              overflow="hidden"
              bg="white"
            >
              <Image
                src={getImageUrl(String(productId).slice(1))}
                layout="fill"
                objectFit="cover"
                alt={`Image with ID ${productId}`}
              />
            </Box>
          </Skeleton>

          <Flex direction="column" flex="1" experimental_spaceY={8} w="full">
            <Stack spacing={4}>
              <Stack spacing={2}>
                <Skeleton
                  isLoaded={similarProducts.length > 0}
                  h="fit-content"
                  w="64"
                >
                  <Breadcrumb fontSize="xs" color="gray.500">
                    <BreadcrumbItem>
                      <Link href="/products" passHref>
                        <BreadcrumbLink>
                          {locale.product.breadcrumbParent}
                        </BreadcrumbLink>
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink isCurrentPage>
                        {product?.prod_name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Skeleton>
                <Skeleton isLoaded={similarProducts.length > 0} w="full">
                  <Text
                    fontSize="xl"
                    fontWeight="semibold"
                    verticalAlign="center"
                  >
                    {product?.prod_name || 'loading'}
                  </Text>
                </Skeleton>
              </Stack>

              <Skeleton isLoaded={similarProducts.length > 0} w="full">
                <Stack bg="gray.100" p="2" borderRadius="md" spacing={0}>
                  <Text fontSize="md" fontWeight="semibold">
                    💸 R$ 300,00
                  </Text>
                  <Text fontSize="xs" fontWeight="400" color="gray.500">
                    3x R$ 100,00
                  </Text>
                </Stack>
              </Skeleton>
            </Stack>
            <Skeleton
              h={similarProducts.length > 0 ? 'auto' : '48'}
              isLoaded={similarProducts.length > 0}
              w="full"
            >
              <Text fontSize="sm">{product?.detail_desc || 'Loading'}</Text>
            </Skeleton>
            <Skeleton isLoaded={similarProducts.length > 0} flex="1" w="full">
              <Flex
                w="full"
                gridGap="6"
                alignItems="center"
                alignSelf="flex-end"
              >
                <Button
                  flex="1"
                  display="flex"
                  colorScheme="orange"
                  alignItems="center"
                  gridGap={2}
                  py={6}
                >
                  <FiShoppingCart />
                  {locale.product.cartButton}
                </Button>

                <Button variant="ghost" py={6}>
                  <FiHeart size={24} />
                </Button>
              </Flex>
            </Skeleton>
          </Flex>
        </Flex>
        {similarProducts.length > 0 ? (
          <ProductsSection
            sectionTitle={locale.product.similarProductsSectionTitle}
            products={similarProducts}
          />
        ) : (
          renderSectionLoadingTemplate()
        )}
      </Container>
    </Layout>
  );
}
