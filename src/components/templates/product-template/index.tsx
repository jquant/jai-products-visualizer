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
  Skeleton,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  GridItem,
} from '@chakra-ui/react';

import { ErrorBox } from '@components/core/error';
import { Layout } from '@components/core/layout';
import { ProductBox } from '@components/products/product-box';

import { useLocale } from '@shared/hooks/useLocale';
import { useProducts } from '@shared/hooks/useProducts';
import { useUsers } from '@shared/hooks/useUsers';

import { ProductProps } from '@shared/services/usecases/products/get-products/types';
import { getImageUrl } from '@shared/utils/get-image-url';

import { ProductTemplateProps } from './types';

export function ProductTemplate({ productId }: ProductTemplateProps) {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState(false);

  const { locale } = useLocale();
  const { accessToken } = useUsers();
  const { fetchSimilarProducts, fetchProducts } = useProducts();

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
      const items = await fetchSimilarProducts({
        database: 'hm_imgs',
        ids: [productId],
      });

      if (items) {
        const findProducts = await fetchProducts({
          filter: {
            $or: items.map((id) => ({
              article_id: Number(id),
            })),
          },
        });

        if (findProducts) {
          setSimilarProducts(findProducts.items);
        }
      } else setError(true);
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
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(12, 1fr)',
          }}
          gridGap={8}
        >
          <Skeleton
            as={GridItem}
            isLoaded={similarProducts.length > 0}
            flex={{
              base: 'auto',
              md: '1',
            }}
            height="lg"
            w="full"
            position="relative"
            colSpan={7}
          >
            <Box
              borderRadius="8px"
              __css={{
                '& *': {
                  borderRadius: '8px',
                },
              }}
            >
              <Image
                src={getImageUrl(String(productId).slice(1))}
                layout="fill"
                objectFit="cover"
                alt={`Image with ID ${productId}`}
              />
            </Box>
          </Skeleton>

          <Flex
            as={GridItem}
            direction="column"
            flex="1"
            experimental_spaceY={8}
            colSpan={5}
          >
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
                <Skeleton isLoaded={similarProducts.length > 0}>
                  <Text
                    fontSize="xl"
                    fontWeight="semibold"
                    verticalAlign="center"
                  >
                    {product?.prod_name}
                  </Text>
                </Skeleton>
              </Stack>

              <Skeleton isLoaded={similarProducts.length > 0}>
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
            <Skeleton isLoaded={similarProducts.length > 0}>
              <Text fontSize="sm">{product?.detail_desc}</Text>
            </Skeleton>
            <Skeleton isLoaded={similarProducts.length > 0} flex="1">
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
        </Grid>

        <Flex direction="column" as="section" gridGap={4}>
          <Skeleton isLoaded={similarProducts.length > 0}>
            <Text w="fit-content" fontWeight="600" fontSize="xl">
              {locale.product.similarProductsSectionTitle}
            </Text>
          </Skeleton>
          <Flex
            direction={{
              base: 'column',
              md: 'row',
            }}
            gridGap={6}
          >
            {similarProducts.length > 0 ? (
              similarProducts.map((similarProduct) => (
                <ProductBox
                  key={similarProduct.article_id}
                  product={similarProduct}
                />
              ))
            ) : (
              <>
                <Skeleton h="64" w="full"></Skeleton>
                <Skeleton h="64" w="full"></Skeleton>
                <Skeleton h="64" w="full"></Skeleton>
                <Skeleton h="64" w="full"></Skeleton>
                <Skeleton h="64" w="full"></Skeleton>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
