import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductsList from "./components/ProductsList";
import { useAppDispatch } from "./store/store";
import { MockProducts } from "./mock-data";
import { loadItems } from "./store/productsSlice";

const App = () => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(
      loadItems({
        items: MockProducts,
      }),
    );
  }, []);

  return (
    <div className="font-poppins text-gray-900">
      <Header />
      <main className="container">
        <ProductsList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
