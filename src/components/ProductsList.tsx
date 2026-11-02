import { MockProducts } from "../mock-data";
import ProductItem from "./ProductItem";

const ProductsList = () => {
  return (
    <section className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
      {MockProducts.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </section>
  );
};

export default ProductsList;
