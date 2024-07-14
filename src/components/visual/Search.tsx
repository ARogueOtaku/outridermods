import debounce from "@/utils/debounce";
import { ReactNode, useCallback, useRef } from "react";

interface SearchInputProps {
  label?: ReactNode;
  placeholder?: string;
  searchValue?: string;
  setSearchValue?: (newSearchValue: string) => void;
  onSearchSubmit: (searchValue: string) => void;
  showButton?: boolean;
  buttonLabel?: ReactNode;
  searchOnType?: boolean;
  searchOnTypeDelay?: number;
}

const SearchInput = ({
  label = "Search",
  placeholder = "",
  searchValue,
  setSearchValue,
  onSearchSubmit,
  showButton = false,
  buttonLabel = "Submit",
  searchOnType = false,
  searchOnTypeDelay = 700,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(
    debounce(onSearchSubmit, searchOnTypeDelay),
    [searchOnTypeDelay],
  );

  return (
    <div className="flex flex-1 border border-slate-700">
      <label
        htmlFor="search"
        className="flex items-center justify-center gap-1 p-1 px-2"
      >
        {label}
      </label>
      <input
        id="search"
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue?.(e.target.value);
          if (searchOnType) handleSubmit(e.target.value);
        }}
        className="flex-1 p-1 outline-none"
      />
      {showButton && (
        <button
          type="button"
          className="flex items-center justify-center gap-1 border-r border-slate-700 p-1 px-2"
          onClick={() => {
            if (inputRef.current) handleSubmit(inputRef.current.value);
          }}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default SearchInput;
