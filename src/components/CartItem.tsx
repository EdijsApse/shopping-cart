import type { CartItem } from "../types/cart";
import { changeQuantity, removeItem } from "../store/cart/slice";
import { useAppDispatch } from "../store/store";
import Button from "./Button";
import ProductLink from "./ProductLink";

const CartItemComponent = (cartItem: CartItem) => {
  const appDispatch = useAppDispatch();
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    if (value >= 1) {
      appDispatch(
        changeQuantity({
          id: cartItem.id,
          newQuantity: value,
        }),
      );
    }
  };
  const onIncreaseHandler = () => {
    appDispatch(
      changeQuantity({
        id: cartItem.id,
        newQuantity: cartItem.quantity + 1,
      }),
    );
  };
  const onDecreaseHandler = () => {
    const newValue = cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;

    if (newValue >= 1) {
      appDispatch(
        changeQuantity({
          id: cartItem.id,
          newQuantity: newValue,
        }),
      );
    }
  };
  const onRemovehandler = () => {
    appDispatch(
      removeItem({
        id: cartItem.id,
      }),
    );
  };

  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 lg:flex-row">
      <div className="w-full rounded overflow-hidden lg:max-w-80">
        <img src={cartItem.image} alt={cartItem.name} />
      </div>
      <div className="flex flex-col">
        <p className="text-cyan-400 text-xs">{cartItem.manufacturer}</p>
        <p className="text-gray-400 text-xs mb-2">{cartItem.category}</p>
        <ProductLink productId={cartItem.id}>{cartItem.name}</ProductLink>
        <p className="text-lg font-bold mb-3">
          <span className="text-lg font-normal">Price:</span> {cartItem.price}$
        </p>
        <div className="flex flex-col gap-4 mt-auto md:flex-row">
          <input
            type="number"
            value={cartItem.quantity}
            onChange={onInputChange}
            className="w-full py-2 px-4 border border-gray-200 rounded md:w-20"
            aria-label={`Quantity of ${cartItem.name} item`}
            name={`quantity-${cartItem.id}`}
          />
          <div className="w-full flex flex-col gap-4 md:flex-row md:w-auto">
            <Button
              onClick={onIncreaseHandler}
              className="w-full justify-center md:auto"
              aria-label="Increase count"
            >
              <i className="fa-solid fa-plus"></i>
            </Button>

            <Button
              onClick={onDecreaseHandler}
              aria-label="Decrease count"
              className="w-full justify-center md:auto"
            >
              <i className="fa-solid fa-minus"></i>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse items-start mt-2 md:mt-0 md:items-center md:flex-row-reverse md:justify-between lg:ml-auto lg:flex-col lg:items-end">
        <p className="mt-4 text-2xl font-bold text-right md:mt-0">
          Total: ${cartItem.price * cartItem.quantity}
        </p>
        <Button
          className="justify-center w-full md:w-auto md:justify-start"
          theme="Danger"
          onClick={onRemovehandler}
        >
          <>
            <i className="fa-solid fa-trash"></i>
            <span>Remove from cart</span>
          </>
        </Button>
      </div>
    </div>
  );
};

export default CartItemComponent;
