export type Product = {
  id: number;
  price: number;
  name: string;
  category: string;
  image: string;
  manufacturer: string;
};

export type CartItem = Product & {
  quantity: number;
};
