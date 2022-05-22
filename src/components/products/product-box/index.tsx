import Image from 'next/image';
import Link from 'next/link';

import { Box, Flex, Text, Stack } from '@chakra-ui/react';

import { getImageUrl } from '@shared/utils/get-image-url';

import { ProductBoxProps } from './types';

export function ProductBox({ productId }: ProductBoxProps) {
  return (
    <Link href={`/products/${productId}`} passHref>
      <Flex as="a" direction="column" gridGap="4" w="full">
        <Box
          w="full"
          h={{
            base: '64',
            md: '56',
          }}
          position="relative"
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
        <Stack spacing={0}>
          <Text fontSize="md" fontWeight="bold">
            Produto {productId}
          </Text>
          <Text fontWeight="500" fontSize="md">
            R$ 300{' '}
            <Text as="span" fontSize="xs" color="gray.500">
              3x R$ 100
            </Text>
          </Text>
        </Stack>
      </Flex>
    </Link>
  );
}
