import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { FiHeart } from 'react-icons/fi';

import { Box, Flex, Text, Stack } from '@chakra-ui/react';

import { getImageUrl } from '@shared/utils/get-image-url';

import { ProductBoxProps } from './types';

export function ProductBox({ product }: ProductBoxProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link href={`/products/${product.article_id}`} passHref>
      <Flex
        as="a"
        direction="column"
        gridGap="4"
        w="full"
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <Box w="full" minH="64" borderRadius="8px" overflow="hidden" bg="white">
          <Box
            w="full"
            h="full"
            transform={isHover ? 'scale(1.4)' : 'scale(1.6)'}
            transition="all 200ms ease"
            position="relative"
          >
            <Image
              src={getImageUrl(String(product.article_id).slice(1))}
              layout="fill"
              objectFit="contain"
              alt={`${product.prod_name}`}
              priority
              quality={80}
            />
          </Box>
        </Box>
        <Flex justifyContent="space-between" w="full">
          <Stack spacing={1}>
            <Text fontSize="md" fontWeight="bold" maxW="80%">
              {product.prod_name}
            </Text>
            <Text fontWeight="600" fontSize="md">
              R$ 300{' '}
              <Text as="span" fontWeight="500" fontSize="xs" color="gray.500">
                3x R$ 100
              </Text>
            </Text>
          </Stack>

          <FiHeart size={24} />
        </Flex>
      </Flex>
    </Link>
  );
}
