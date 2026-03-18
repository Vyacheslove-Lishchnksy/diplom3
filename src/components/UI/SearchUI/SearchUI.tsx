import { FaSearch } from "react-icons/fa";
import InputUI from "../InputUI/InputUI";
import { JSX } from "react";

interface ISearchProps {
  search: string;
  setSearch: (state: string) => void;
}

const SearchUI = ({ search, setSearch }: ISearchProps): JSX.Element => {
  return (
    <InputUI
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      placeholder="search..."
      icon={<FaSearch />}
      tabIndex={30}
    />
  );
};

export default SearchUI;
