import type { Product } from "../types/product";
import AddToCartButton from "./AddToCartButton";
import ProductLink from "./ProductLink";

const ProductItem = (product: Product) => {
  return (
    <div className="rounded-xl shadow-lg bg-gray-50">
      <div className="rounded-t-xl overflow-hidden">
        <img className="w-full" src={product.image} alt="Laptop" />
      </div>
      <div className="px-2 pb-2">
        <div className="my-4">
          <p className="text-cyan-400 text-xs">{product.manufacturer}</p>
          <p className="text-gray-400 text-xs mb-2">{product.category}</p>
          <ProductLink productId={product.id} className="mb-3">
            {product.name}
          </ProductLink>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductItem;
