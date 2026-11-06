import ProductsList from "../components/ProductsList";
import { useAppDispatch } from "../store/store";
import { MockProducts, Categories } from "../mock-data";
import { useEffect } from "react";
import { loadItems } from "../store/productsSlice";
import { useSearchParams } from "react-router";
import Button from "../components/Button";
import DrodpownSelect from "../components/DropdownSelect";

type ProductsSearchParams = {
  categories: number[];
  keyword: string;
};

const getCategoriesArray = (categoryString: string): number[] => {
  try {
    return JSON.parse(categoryString)
      .map((cat: string) => +cat)
      .filter((cat: number) => {
        return !Number.isNaN(cat);
      });
  } catch {
    return [];
  }
};

const categoryDropdownItems = Categories.map((cat) => ({
  value: cat.id,
  display: cat.name,
}));

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const selectedCategories = getCategoriesArray(
    searchParams.get("categories") ?? "",
  );
  const appDispatch = useAppDispatch();
  const updateSearchParams = (newParams: ProductsSearchParams) => {
    const { categories, keyword } = newParams;
    setSearchParams({
      keyword,
      categories: JSON.stringify(categories),
    });
  };
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParams({
      keyword: event.target.value,
      categories: selectedCategories,
    });
  };
  const onSelectCategory = (value: number) => {
    const newValues = [...selectedCategories];
    const categoryIndex = newValues.findIndex((val) => val === value);

    if (categoryIndex === -1) {
      newValues.push(value);
    } else {
      newValues.splice(categoryIndex, 1);
    }

    updateSearchParams({
      keyword,
      categories: newValues,
    });
  };

  useEffect(() => {
    let filteredProducts = [...MockProducts];

    if (keyword.length || selectedCategories.length) {
      filteredProducts = filteredProducts.filter((product) => {
        let matchedCategory = true;
        let matchedKeyword = true;

        if (selectedCategories.length) {
          const productCategory = Categories.find(
            (cat) => cat.name === product.category,
          );
          matchedCategory = productCategory
            ? selectedCategories.includes(productCategory.id)
            : false;
        }

        if (keyword.length) {
          matchedKeyword = product.name
            .toLocaleLowerCase()
            .includes(keyword.toLocaleLowerCase());
        }

        return matchedCategory && matchedKeyword;
      });
    }

    appDispatch(
      loadItems({
        items: filteredProducts,
      }),
    );
  }, [keyword, selectedCategories]);

  return (
    <section>
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
            selectedValues={selectedCategories}
            onSelect={onSelectCategory}
          />
        </div>

        {keyword || selectedCategories.length ? (
          <Button
            className="justify-center md:justify-start"
            style="Danger"
            onClick={() => {
              setSearchParams({});
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
      <ProductsList />
    </section>
  );
};

export default Products;
