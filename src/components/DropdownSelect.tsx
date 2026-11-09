import { useEffect, useRef, useState } from "react";

type DropdownSelectItem = {
  value: number;
  display: string;
};

type DrodpownSelectProps = {
  items: DropdownSelectItem[];
  selectedValues?: number[];
  onSelect: (value: number) => void;
};

const DrodpownSelect = ({
  items,
  onSelect,
  selectedValues = [],
}: DrodpownSelectProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelectValue = (value: number) => {
    onSelect(value);
  };

  const toggleVisibility = () => {
    setIsOpened((oldState) => !oldState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="flex items-center h-12 py-2 px-4 border bg-white border-gray-200 rounded cursor-pointer"
        onClick={toggleVisibility}
      >
        <span>
          {selectedValues.length
            ? `${selectedValues.length} selected`
            : "Select option"}
        </span>
        <button
          className="ml-auto cursor-pointer"
          type="button"
          aria-label="Change visibility"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            toggleVisibility();
          }}
        >
          <i
            className={`fa-solid fa-chevron-down ${isOpened ? "rotate-180" : ""} transition-all duration-300`}
          ></i>
        </button>
      </div>
      <div
        className={`absolute w-full top-[calc(100%+0.25rem)] bg-white shadow rounded transition-all duration-300 ${
          isOpened ? "" : "hidden"
        }`}
      >
        <ul>
          {items.map((item) => (
            <li key={item.value}>
              <button
                onClick={() => {
                  onSelectValue(item.value);
                }}
                className="w-full flex items-center py-2 px-4 border-b border-gray-100 last-of-type:border-b-0 cursor-pointer group"
              >
                <span className="group-hover:text-cyan-400 transition-all duration-300">
                  {item.display}
                </span>
                {selectedValues.includes(item.value) && (
                  <i className="ml-auto text-cyan-500 fa-solid fa-check"></i>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <input
        type="hidden"
        name="selected-values"
        value={JSON.stringify(selectedValues)}
      />
    </div>
  );
};

export default DrodpownSelect;
