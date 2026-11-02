import type { Product } from "../types/product";

const ProductItem = ({
  category,
  image,
  manufacturer,
  name,
  price,
}: Product) => {
  return (
    <div className="rounded-xl shadow-lg bg-gray-50">
      <div className="rounded-t-xl overflow-hidden">
        <img className="w-full" src={image} alt="Laptop" />
      </div>
      <div className="px-2 pb-2">
        <div className="my-4">
          <p className="text-cyan-400 text-xs">{manufacturer}</p>
          <p className="text-gray-400 text-xs mb-2">{category}</p>
          <p className="text-lg font-bold mb-3">{name}</p>
        </div>
        <button className="flex justify-between w-full bg-gray-100 rounded-lg text-md button-hover">
          <div className="py-3 px-4 flex items-center">
            <i className="mr-2 fa-solid fa-cart-shopping text-xl"></i>
            Add to cart
          </div>
          <span className="flex items-center bg-cyan-300 rounded-r-lg px-4 font-semibold text-lg">
            {price}$
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
