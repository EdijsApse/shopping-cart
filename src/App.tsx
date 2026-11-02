import ProductItem from "./components/ProductItem";
import { MockProducts } from "./mock-data";

const App = () => {
  return (
    <div className="font-poppins max-w-6xl mx-auto px-6">
      <section className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
        {MockProducts.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </section>
    </div>
  );
};

export default App;
