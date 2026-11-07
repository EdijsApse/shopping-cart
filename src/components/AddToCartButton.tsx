import { useMemo } from "react";
import { addItem } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import type { Product } from "../types/product";
import Button from "./Button";

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const appDispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const onAddHandler = () => {
    appDispatch(
      addItem({
        item: product,
      }),
    );
  };
  const isAdded = useMemo(() => {
    return cartItems.findIndex((item) => item.id === product.id) !== -1;
  }, [cartItems, product]);

  return (
    <Button
      className="w-full py-0! px-0! justify-between"
      onClick={onAddHandler}
      disabled={isAdded}
    >
      {!isAdded ? (
        <>
          <div className="py-3 px-4 flex items-center">
            <i className="mr-2 fa-solid fa-cart-shopping text-xl"></i>
            Add to cart
          </div>
          <span className="h-full flex items-center bg-cyan-300 rounded-r-lg px-4 font-semibold text-lg">
            {product.price}$
          </span>
        </>
      ) : (
        <div className="w-full">
          <p>Added</p>
        </div>
      )}
    </Button>
  );
};

export default AddToCartButton;
