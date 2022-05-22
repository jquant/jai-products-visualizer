import { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { FiHeart, FiShoppingCart } from 'react-icons/fi';

import {
  Box,
  Button,
  Container,
  Flex,
  Skeleton,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';

import { ErrorBox } from '@components/core/error';
import { Layout } from '@components/core/layout';
import { ProductBox } from '@components/products/product-box';

import { useLocale } from '@shared/hooks/useLocale';
import { useProducts } from '@shared/hooks/useProducts';
import { useUsers } from '@shared/hooks/useUsers';

import { getImageUrl } from '@shared/utils/get-image-url';

import { ProductTemplateProps } from './types';

export function ProductTemplate({ productId }: ProductTemplateProps) {
  const [similarProducts, setSimilarProducts] = useState<number[]>([]);
  const [error, setError] = useState(false);

  const { accessToken } = useUsers();
  const { fetchSimilarProducts } = useProducts();
  const { locale } = useLocale();

  useEffect(() => {
    async function fetch() {
      const items = await fetchSimilarProducts({
        accessToken,
        id: productId,
      });

      if (items) {
        setSimilarProducts(items);
      } else setError(true);
    }

    void fetch();
  }, [accessToken, fetchSimilarProducts, productId]);

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
            isLoaded={similarProducts.length > 0}
            flex={{
              base: 'auto',
              md: '1',
            }}
            height="lg"
            w="full"
            position="relative"
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
                src={getImageUrl(productId)}
                layout="fill"
                objectFit="cover"
                alt={`Image with ID ${productId}`}
              />
            </Box>
          </Skeleton>
          <Flex direction="column" flex="1" experimental_spaceY={8}>
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
                        {locale.product.breadcrumbCurrent} {productId}
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
                    {locale.product.title}
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
              <Text fontSize="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum blandit erat non dui luctus, id consectetur justo
                tempus. Aenean turpis felis, rhoncus non purus vitae,
                pellentesque ultricies ipsum. Nunc venenatis mauris vitae velit
                lacinia interdum. Maecenas eget erat purus. Praesent egestas, mi
                non pretium sodales, odio lorem rhoncus justo, vel rhoncus
                libero metus vel turpis. Nullam eleifend porttitor pretium.
                Nullam sed sapien nec augue auctor semper ut et felis. Morbi sed
                volutpat augue. Nulla quis diam nisl. Integer dignissim, quam
                euismod ullamcorper lacinia, sapien elit hendrerit sapien, vitae
                efficitur nulla ligula sit amet ex. Integer sed mi ac metus
                elementum lacinia. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos.
              </Text>
            </Skeleton>
            <Skeleton isLoaded={similarProducts.length > 0}>
              <Flex w="full" gridGap="6" alignItems="center">
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

        <Flex direction="column" as="section" gridGap={4}>
          <Skeleton w="64" isLoaded={similarProducts.length > 0}>
            <Text fontWeight="500">
              👉🏻 {locale.product.similarProductsSectionTitle}
            </Text>
          </Skeleton>
          <Flex
            direction={{
              base: 'column',
              md: 'row',
            }}
            gridGap={8}
          >
            {similarProducts.length > 0 ? (
              similarProducts.map((id) => (
                <ProductBox key={id} productId={id} />
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
