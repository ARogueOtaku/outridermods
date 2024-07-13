import SearchInput from "@/components/visual/Search";
import { setSearchInput } from "@/store/actions";
import searchIcon from "@/assets/search.svg";
import Icon from "@/components/visual/Icon";

const SearchLabel = () => {
  return (
    <>
      <Icon src={searchIcon} size={12} className="mt-0.5" alt="Search Icon" />
      <span>Search</span>
    </>
  );
};

const SearchBar = () => {
  return (
    <div className="flex w-full">
      <SearchInput
        onSearchSubmit={setSearchInput}
        placeholder="Enter search term here..."
        searchOnType
        searchOnTypeDelay={500}
        label={<SearchLabel />}
      />
    </div>
  );
};

export default SearchBar;
