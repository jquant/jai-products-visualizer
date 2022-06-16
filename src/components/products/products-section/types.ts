import { ProductProps } from '@shared/services/usecases/products/get-products/types';

export type ProductsSectionProps = {
  sectionTitle?: string;
  sectionSubtitle?: string;
  products: ProductProps[];
};
