import ProductItem from "./ProductItem";
import { useAppSelector } from "../store/store";

const ProductsList = () => {
  const products = useAppSelector((state) => state.products.items);
  return (
    <section>
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-lg">No products found</p>
      )}
    </section>
  );
};

export default ProductsList;
