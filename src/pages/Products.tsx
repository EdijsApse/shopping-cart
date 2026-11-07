import ProductsList from "../components/ProductsList";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Categories } from "../mock-data";
import { useEffect, useState } from "react";
import { loadItems } from "../store/products/thunks";
import Button from "../components/Button";
import DrodpownSelect from "../components/DropdownSelect";
import Spinner from "../components/Spinner";

const categoryDropdownItems = Categories.map((cat) => ({
  value: cat.id,
  display: cat.name,
}));

const Products = () => {
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState<number[]>([]);
  const { isLoadingItems, itemsError, items } = useAppSelector(
    (state) => state.products,
  );

  const appDispatch = useAppDispatch();
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const onSelectCategory = (value: number) => {
    const newValues = [...categories];
    const categoryIndex = newValues.findIndex((val) => val === value);

    if (categoryIndex === -1) {
      newValues.push(value);
    } else {
      newValues.splice(categoryIndex, 1);
    }

    setCategories(newValues);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      appDispatch(
        loadItems({
          keyword,
          categories,
        }),
      );
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [appDispatch, keyword, categories]);

  return (
    <section className="relative">
      <div className="flex flex-col gap-4 md:flex-row mb-10">
        <div className="w-full grid gap-4 md:grid-cols-2 md:gap-x-4 xl:max-w-1/2">
          <input
            type="text"
            name="keyword"
            placeholder="What are you looking for?"
            min={0}
            value={keyword}
            onChange={onInputChange}
            className="h-12 py-2 px-4 border border-gray-200 rounded"
            aria-label={`Search keyword`}
          />

          <DrodpownSelect
            items={categoryDropdownItems}
            selectedValues={categories}
            onSelect={onSelectCategory}
          />
        </div>

        {keyword || categories.length ? (
          <Button
            className="justify-center md:justify-start"
            style="Danger"
            onClick={() => {
              setCategories([]);
              setKeyword("");
            }}
          >
            <>
              <i className="fa-solid fa-close"></i>
              <span>Clear</span>
            </>
          </Button>
        ) : (
          ""
        )}
      </div>
      {isLoadingItems && <Spinner />}
      {!isLoadingItems && items.length !== 0 && <ProductsList items={items} />}
      {!isLoadingItems && itemsError && (
        <p className="text-center text-2xl font-semibold">{itemsError}</p>
      )}
    </section>
  );
};

export default Products;
