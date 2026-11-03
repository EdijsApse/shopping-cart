import { Categories } from "../mock-data";
import { useAppSelector } from "../store/store";

const Header = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <header>
      <div className="bg-gray-100 py-4">
        <div className="container flex justify-end">
          <button className="flex items-center py-3 px-4 bg-white rounded-lg text-md cursor-pointer button-hover">
            <i className="mr-2 fa-solid fa-cart-shopping text-xl"></i>
            {cartItems.length}
          </button>
        </div>
      </div>
      <div className="container flex flex-wrap gap-4 py-8">
        {Categories.map((cat) => (
          <span
            key={cat.id}
            className="bg-gray-100 py-2 px-4 rounded button-hover hover:text-cyan-400"
          >
            {cat.name}
          </span>
        ))}
      </div>
    </header>
  );
};

export default Header;
