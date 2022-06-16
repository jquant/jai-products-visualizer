import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Flex, Stack, Text, Button } from '@chakra-ui/react';

import { ProductBox } from '@components/products/product-box';

import { ProductsSectionProps } from './types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export function ProductsSection({
  products,
  sectionSubtitle,
  sectionTitle,
}: ProductsSectionProps) {
  const randomId = Math.floor(Math.random() * 2e10);

  return (
    <Flex direction="column" as="section" gridGap={4} w="full">
      {(sectionTitle || sectionSubtitle) && (
        <Stack spacing={2}>
          {sectionTitle && (
            <Text w="fit-content" fontWeight="600" fontSize="xl">
              {sectionTitle}
            </Text>
          )}

          {sectionSubtitle && (
            <Text w="fit-content" fontWeight="500" fontSize="lg">
              {sectionSubtitle}
            </Text>
          )}
        </Stack>
      )}
      <Box position="relative">
        <Swiper
          spaceBetween={24}
          slidesPerView={4}
          navigation={{
            nextEl: `.swiper-custom-button-next-${randomId}`,
            prevEl: `.swiper-custom-button-prev-${randomId}`,
          }}
          grabCursor
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.article_id}>
              <ProductBox product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          className={`swiper-custom-button-prev-${randomId}`}
          position="absolute"
          left="0"
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex="modal"
          w="14"
          h="14"
          p="0"
          borderRadius="full"
          colorScheme="orange"
          boxShadow="lg"
          _focus={{
            boxShadow: 'lg',
          }}
        >
          <FiChevronLeft size={24} />
        </Button>
        <Button
          className={`swiper-custom-button-next-${randomId}`}
          position="absolute"
          right="0"
          top="50%"
          w="14"
          h="14"
          p="0"
          borderRadius="full"
          transform="translate(50%, -50%)"
          zIndex="modal"
          colorScheme="orange"
          boxShadow="lg"
          _focus={{
            boxShadow: 'lg',
          }}
        >
          <FiChevronRight size={24} />
        </Button>
      </Box>
    </Flex>
  );
}
