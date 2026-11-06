import { useMemo } from "react";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { useAppSelector } from "../store/store";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const total = useMemo(() => {
    return cartItems.reduce(
      (current, item) => current + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold">Complete Your Order</h1>
      <div className="space-y-6">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))}
        {cartItems.length !== 0 && (
          <div className="flex flex-col-reverse gap-4 justify-between mt-10 md:flex-row md:mt-0">
            <Button className="justify-center md:justify-start">
              Checkout
            </Button>
            <p className="text-4xl font-bold ml-auto md:ml-0">
              Total: ${total}
            </p>
          </div>
        )}
        {cartItems.length === 0 && (
          <p className="text-lg text-center font-semibold">
            No items added to the cart
          </p>
        )}
      </div>
    </section>
  );
};

export default Checkout;
