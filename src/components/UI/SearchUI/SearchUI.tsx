import { FaSearch } from "react-icons/fa";
import InputUI from "../InputUI/InputUI";
import React, { JSX } from "react";

interface ISearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  search: string;
  setSearch: (state: string) => void;
}

const SearchUI = ({
  search,
  setSearch,
  ...rest
}: ISearchProps): JSX.Element => {
  return (
    <InputUI
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      icon={<FaSearch />}
      tabIndex={30}
      {...rest}
    />
  );
};

export default SearchUI;
