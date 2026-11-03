import ProductsList from "../components/ProductsList";
import { useAppDispatch } from "../store/store";
import { MockProducts, Categories } from "../mock-data";
import { useEffect } from "react";
import { loadItems } from "../store/productsSlice";

const Products = () => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(
      loadItems({
        items: MockProducts,
      }),
    );
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-10">
        {Categories.map((cat) => (
          <span
            key={cat.id}
            className="bg-gray-100 py-2 px-4 rounded button-hover hover:text-cyan-400"
          >
            {cat.name}
          </span>
        ))}
      </div>
      <ProductsList />
    </div>
  );
};

export default Products;
