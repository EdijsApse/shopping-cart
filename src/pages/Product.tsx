import { useNavigate, useParams } from "react-router";
import { MockProducts, ProductReviews } from "../mock-data/index";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { getItem } from "../store/productsSlice";
import Button from "../components/Button";
import { addItem } from "../store/cartSlice";

const Product = () => {
  const [selectedRating, setSelectedRating] = useState(1);
  const { productId } = useParams();
  const product = useAppSelector((state) => state.products.product);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const onAddHandler = () => {
    if (product) {
      appDispatch(
        addItem({
          item: product,
        }),
      );
    }
  };
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submited");
  };

  useEffect(() => {
    const product = MockProducts.find((p) => `${p.id}` === productId);

    if (product) {
      appDispatch(getItem({ product }));
    } else {
      navigate("/404");
    }
  }, [productId]);

  return (
    <section>
      {product && (
        <>
          <div className="grid lg:grid-cols-[40%_60%] xl:grid-cols-[30%_70%] gap-8">
            <div className="rounded overflow-hidden">
              <img
                className="h-full object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="py-2">
              <h1 className="text-4xl font-semibold">{product.name}</h1>
              <div className="mt-2 mb-4">
                <p className="text-cyan-400 text-xs">{product.manufacturer}</p>
                <p className="text-gray-400 text-xs">{product.category}</p>
                {product.description && (
                  <p className="text-gray-600 max-w-xl mt-4">
                    {product.description}
                  </p>
                )}
              </div>
              <Button
                className="w-full md:w-auto py-0! px-0! justify-between"
                onClick={onAddHandler}
              >
                <>
                  <div className="py-3 px-4 flex items-center">
                    <i className="mr-2 fa-solid fa-cart-shopping text-xl"></i>
                    Add to cart
                  </div>
                  <span className="h-full flex items-center bg-cyan-300 rounded-r-lg px-4 font-semibold text-lg">
                    {product.price}$
                  </span>
                </>
              </Button>
            </div>
          </div>
          <div className="grid gap-16 justify-items-center my-20 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 md:mx-10 xl:mx-20">
            {ProductReviews.map((rev, index) => (
              <div
                key={rev.id}
                className={`flex flex-col items-center gap-6 text-center ${index === 2 ? `md:max-lg:col-span-2 md:max-lg:mx-auto md:max-lg:max-w-1/2` : ""}`}
              >
                <div className="flex justify-center items-center w-32 h-32 rounded-full bg-gray-50 border-8 border-gray-100">
                  <span className="font-semibold text-cyan-400 text-6xl">
                    {rev.fullName[0]}
                  </span>
                </div>
                <p className="text-2xl font-semibold">{rev.fullName}</p>
                <p className="italic">{rev.review}</p>
                <div className="flex gap-4 mt-auto">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i
                      key={index}
                      className={`text-2xl text-amber-300 fa-star ${index + 1 <= rev.rating ? "fa-solid" : "fa-regular"}`}
                    ></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold mb-10">Review product</h2>
            <div className="w-full space-y-6 lg:max-w-xl">
              <div className="flex flex-col">
                <label htmlFor="fullname" className="mb-2 font-semibold">
                  Fullname
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  className="form-input rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="mb-2 font-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  name="fullname"
                  className="form-input resize-none min-h-32"
                ></textarea>
              </div>
              <div className="flex gap-4 mt-auto">
                {Array.from({ length: 5 }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className="cursor-pointer"
                    aria-label={`Give ${index + 1} rating for this product`}
                    onClick={() => {
                      setSelectedRating(index + 1);
                    }}
                  >
                    <i
                      className={`text-4xl text-amber-300 fa-star ${index + 1 <= selectedRating ? "fa-solid" : "fa-regular"}`}
                    ></i>
                  </button>
                ))}
              </div>
              <Button
                className="w-full justify-center md:w-auto md:justify-start"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default Product;
