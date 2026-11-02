import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductsList from "./components/ProductsList";

const App = () => {
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
