import { JSX } from "react";
import { useStateStore } from "../store/melodyStore";
import ChangeModeButton from "./ChangeModeButton";
import AddNewMelodyButton from "./AddNewMelodyButton";
import SearchUI from "./UI/SearchUI/SearchUI";

const NavigationBar = (): JSX.Element => {
  const { search, setSearch } = useStateStore((state) => state);

  return (
    <nav
      className="flex w-full p-4"
      style={{ justifyContent: "space-between", paddingBottom: "2rem" }}
    >
      <div className="flex">
        <ChangeModeButton />
        <AddNewMelodyButton />
      </div>
      <SearchUI search={search} setSearch={setSearch} />
    </nav>
  );
};

export default NavigationBar;
