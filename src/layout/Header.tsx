import { useAppSelector } from "../store/store";
import { Link, NavLink } from "react-router";

const Header = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <header>
      <div className="bg-gray-100 py-4">
        <div className="container flex justify-between items-center">
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "text-cyan-400" : ""} hover:text-cyan-400 transition-all duration-300`
              }
            >
              Products
            </NavLink>
          </nav>
          <Link
            to={"/checkout"}
            className="flex items-center py-3 px-4 bg-white rounded-lg text-md cursor-pointer button-hover"
          >
            <i className="mr-2 fa-solid fa-cart-shopping text-xl"></i>
            {cartItems.length}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
