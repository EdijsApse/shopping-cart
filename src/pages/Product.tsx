import { useNavigate, useParams } from "react-router";
import { ProductReviews } from "../mock-data/index";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import ReviewForm from "../layout/ReviewForm";
import { getItem } from "../store/products/thunks";
import Spinner from "../components/Spinner";
import AddToCartButton from "../components/AddToCartButton";

const Product = () => {
  const { isLoadingDetails, product } = useAppSelector(
    (state) => state.products,
  );
  const { productId } = useParams();
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    appDispatch(getItem(productId));
  }, [productId]);

  if (!isLoadingDetails && !product) {
    return navigate("/404");
  }

  return (
    <section className="relative">
      {isLoadingDetails && <Spinner />}
      {product && !isLoadingDetails && (
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
              <div className="max-w-full md:max-w-xs">
                <AddToCartButton product={product} />
              </div>
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

          {productId ? <ReviewForm productId={productId} /> : ""}
        </>
      )}
    </section>
  );
};

export default Product;
