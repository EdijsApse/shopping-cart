import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "../zod-schemas/product-review";
import { useAppDispatch, useAppSelector } from "../store/store";
import Spinner from "../components/Spinner";
import { reviewProduct } from "../store/products/thunks";

type ReviewFormProps = {
  productId: string;
};

const ReviewForm = ({ productId }: ReviewFormProps) => {
  const appDispatch = useAppDispatch();
  const { reviewError, reviewStored, savingReview, reviewSubmited } =
    useAppSelector((state) => state.products);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      fullname: "",
      description: "",
      rating: 1,
    },
  });

  const onSubmitHandler = handleSubmit((values) => {
    appDispatch(
      reviewProduct({
        ...values,
        id: productId,
      }),
    );
  });

  return (
    <div className="relative min-h-20">
      {savingReview && <Spinner />}
      {!savingReview && !reviewStored && reviewSubmited && (
        <p className="my-10 text-center text-3xl font-semibold">
          Your review wasn't saved.
          {reviewError && <> Reason - {reviewError}</>}
        </p>
      )}
      {reviewSubmited && reviewStored && (
        <p className="my-10 text-center text-3xl font-semibold">
          Thank you for your review!
        </p>
      )}
      {!reviewStored && !savingReview && (
        <form onSubmit={onSubmitHandler}>
          <h2 className="text-3xl font-semibold mb-10">Review product</h2>
          <div className="w-full space-y-6 lg:max-w-xl">
            <div className="flex flex-col">
              <label htmlFor="fullname" className="mb-2 font-semibold">
                Fullname
              </label>
              <input
                id="fullname"
                className={`form-input rounded-lg ${errors?.fullname?.message ? "border-red-500" : ""}`}
                {...register("fullname")}
              />
              {errors?.fullname?.message && (
                <p className="mt-2 text-red-500">{errors.fullname.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-semibold">
                Description
              </label>
              <textarea
                id="description"
                className={`form-input resize-none min-h-32 ${errors?.description?.message ? "border-red-500" : ""}`}
                {...register("description")}
              ></textarea>
              {errors?.description?.message && (
                <p className="mt-2 text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex gap-4 mt-auto">
                {Array.from({ length: 5 }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className="cursor-pointer"
                    aria-label={`Give ${index + 1} rating for this product`}
                    onClick={() => {
                      setValue("rating", index + 1, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <i
                      className={`text-4xl text-amber-300 fa-star ${index + 1 <= getValues("rating") ? "fa-solid" : "fa-regular"}`}
                    ></i>
                  </button>
                ))}
              </div>
              <input type="hidden" {...register("rating")} />
              {errors?.rating?.message && (
                <p className="mt-2 text-red-500">{errors.rating.message}</p>
              )}
            </div>
            <Button
              className="w-full justify-center md:w-auto md:justify-start"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
