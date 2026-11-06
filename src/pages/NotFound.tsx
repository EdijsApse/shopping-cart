import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="text-center">
      <h1 className="text-2xl text-center font-semibold">Page not found</h1>
      <p className="max-w-lg mx-auto text-gray-500 text-center my-4">
        Sorry, the page you're looking for doesn't exist or may have been moved.
        Please check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="text-cyan-400 hover:text-gray-900 transition-all duration-300"
      >
        View all products
      </Link>
    </section>
  );
};
export default NotFound;
