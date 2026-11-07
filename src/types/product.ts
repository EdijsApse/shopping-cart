export type Product = {
  id: number;
  price: number;
  name: string;
  category: string;
  image: string;
  manufacturer: string;
  description?: string;
};

export type ProductsSearchParams = {
  categories: number[];
  keyword: string;
};
