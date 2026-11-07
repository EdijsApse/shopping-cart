import { Link } from "react-router";
import type { Product } from "../types/product";
import AddToCartButton from "./AddToCartButton";

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
          <Link
            to={`/products/${product.id}`}
            className="text-lg font-bold mb-3 cursor-pointer hover:text-cyan-400 transition-all duration-300"
          >
            {product.name}
          </Link>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductItem;
