export type ProductProps = {
  article_id: number;
  colour_group_code: number;
  colour_group_name: string;
  department_name: string;
  department_no: number;
  detail_desc: string;
  garment_group_name: string;
  garment_group_no: number;
  graphical_appearance_name: string;
  graphical_appearance_no: number;
  index_code: string;
  index_group_name: string;
  index_group_no: number;
  index_name: string;
  perceived_colour_master_id: number;
  perceived_colour_master_name: string;
  perceived_colour_value_id: number;
  perceived_colour_value_name: string;
  prod_name: string;
  product_code: number;
  product_group_name: string;
  product_type_name: string;
  product_type_no: number;
  section_name: string;
  section_no: number;
  _id: string;
};

export type ProductResponseProps = {
  items: ProductProps[];
  pagination: {
    limit: number;
    near_pages: number;
    page: number;
    total: number;
  };
};
