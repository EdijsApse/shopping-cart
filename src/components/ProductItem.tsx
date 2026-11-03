import { addItem } from "../store/cartSlice";
import { useAppDispatch } from "../store/store";
import type { Product } from "../types/product";

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
          <p className="text-lg font-bold mb-3">{product.name}</p>
        </div>
        <button
          className="flex justify-between w-full bg-gray-100 rounded-lg text-md button-hover"
          onClick={onAddHandler}
        >
          <div className="py-3 px-4 flex items-center">
            <i className="mr-2 fa-solid fa-cart-shopping text-xl"></i>
            Add to cart
          </div>
          <span className="flex items-center bg-cyan-300 rounded-r-lg px-4 font-semibold text-lg">
            {product.price}$
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
