import CartItem from "../components/CartItem";
import { useAppSelector } from "../store/store";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold">Complete Your Order</h1>
      <div className="space-y-6">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))}
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
