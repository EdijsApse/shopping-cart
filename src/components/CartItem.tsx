import type { CartItem } from "../types/product";
import { changeQuantity, removeItem } from "../store/cartSlice";
import { useAppDispatch } from "../store/store";
import Button from "./Button";

const CartItemComponent = (cartItem: CartItem) => {
  const appDispatch = useAppDispatch();
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

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
    <div
      key={cartItem.id}
      className="flex space-x-4 border-b border-gray-100 pb-6"
    >
      <div className="max-w-80 w-full rounded overflow-hidden">
        <img src={cartItem.image} alt={cartItem.name} />
      </div>
      <div className="flex flex-col">
        <p className="text-cyan-400 text-xs">{cartItem.manufacturer}</p>
        <p className="text-gray-400 text-xs mb-2">{cartItem.category}</p>
        <p className="text-lg font-bold">{cartItem.name}</p>
        <p className="text-lg font-bold mb-3">{cartItem.price}$</p>
        <div className="flex space-x-4 mt-auto">
          <input
            type="number"
            min={0}
            value={cartItem.quantity}
            onChange={onInputChange}
            className="w-20 py-2 px-4 border border-gray-200 rounded"
            aria-label={`Quantity of ${cartItem.name} item`}
          />
          <Button onClick={onIncreaseHandler}>
            <i className="fa-solid fa-plus"></i>
          </Button>

          <Button onClick={onDecreaseHandler}>
            <i className="fa-solid fa-minus"></i>
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between ml-auto">
        <p className="text-2xl font-bold text-right">
          ${cartItem.price * cartItem.quantity}
        </p>
        <Button style="Danger" onClick={onRemovehandler}>
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
