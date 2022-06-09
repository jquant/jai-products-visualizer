import { useEffect, useState } from 'react';

import { Flex, Skeleton, Text } from '@chakra-ui/react';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductBox } from '@components/products/product-box';

import { useProducts } from '@shared/hooks/useProducts';

import { ProductsSectionProps } from './types';

export function ProductsSection({ database }: ProductsSectionProps) {
  const [products, setProducts] = useState<number[]>([]);

  const { fetchProducts } = useProducts();

  useEffect(() => {
    async function handle() {
      const items = await fetchProducts(database);

      if (items) {
        setProducts(items);
      }
    }

    handle();
  }, [fetchProducts, database]);

  return (
    <Flex direction="column" gridGap={6}>
      <Skeleton isLoaded={products.length > 0}>
        <Text fontWeight="semibold">
          {database} ({products.length} products)
        </Text>
      </Skeleton>

      <div>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={30}
          pagination
          direction="horizontal"
        >
          {products.length > 0 ? (
            products.slice(0, 10).map((id) => (
              <SwiperSlide key={id}>
                <ProductBox productId={id} />
              </SwiperSlide>
            ))
          ) : (
            <>
              <SwiperSlide>
                <Skeleton h="64" />
              </SwiperSlide>
              <SwiperSlide>
                <Skeleton h="64" />
              </SwiperSlide>
              <SwiperSlide>
                <Skeleton h="64" />
              </SwiperSlide>
              <SwiperSlide>
                <Skeleton h="64" />
              </SwiperSlide>
              <SwiperSlide>
                <Skeleton h="64" />
              </SwiperSlide>
              <SwiperSlide>
                <Skeleton h="64" />
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </div>
    </Flex>
  );
}
