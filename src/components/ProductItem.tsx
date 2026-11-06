import { Link } from "react-router";
import { addItem } from "../store/cartSlice";
import { useAppDispatch } from "../store/store";
import type { Product } from "../types/product";
import Button from "./Button";

const ProductItem = (product: Product) => {
  const appDispatch = useAppDispatch();
  const onAddHandler = () => {
    appDispatch(
      addItem({
        item: product,
      }),
    );
  };
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
        <Button
          className="w-full py-0! px-0! justify-between"
          onClick={onAddHandler}
        >
          <>
            <div className="py-3 px-4 flex items-center">
              <i className="mr-2 fa-solid fa-cart-shopping text-xl"></i>
              Add to cart
            </div>
            <span className="h-full flex items-center bg-cyan-300 rounded-r-lg px-4 font-semibold text-lg">
              {product.price}$
            </span>
          </>
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
