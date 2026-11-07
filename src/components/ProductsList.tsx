import ProductItem from "./ProductItem";
import type { Product } from "../types/product";

type ProductsListProps = {
  items: Product[];
};

const ProductsList = ({ items }: ProductsListProps) => {
  return (
    <section>
      {items.length && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsList;
