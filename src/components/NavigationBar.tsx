import { JSX } from "react";
import { useStateStore, useLocaleStore } from "../store/stateStore";
import ChangeModeButton from "./ChangeModeButton";
import AddNewMelodyButton from "./AddNewMelodyButton";
import SearchUI from "./UI/SearchUI/SearchUI";
import { useLocalization } from "../hooks/Localization/useLocalization";
import SimpleSmallButtonUI from "./UI/SimpleSmallButtonUI/SimpleSmallButtonUI";
import Image from "next/image";
import { useCurrentLangFlag } from "../hooks/Localization/useCurrentLangFlag";

const NavigationBar = (): JSX.Element => {
  const { search, setSearch,  } = useStateStore((state) => state);
  const { lang, setLang } = useLocaleStore((state) => state);
  const { Search } = useLocalization();
  const flag = useCurrentLangFlag();
 
  return (
    <nav
      className="flex w-full p-4"
      style={{ justifyContent: "space-between", paddingBottom: "2rem" }}
    >
      <div className="flex">
        <ChangeModeButton />
        <AddNewMelodyButton />
        <SimpleSmallButtonUI
          onClick={() => {
            setLang(lang === "en" ? "uk" : "en");
          }}
        >
          <Image className="p-0.5" src={flag ?? ""} alt={lang} width={24} height={24}/>
        </SimpleSmallButtonUI>
      </div>
      <SearchUI
        search={search}
        setSearch={setSearch}
        placeholder={Search}
      />
    </nav>
  );
};

export default NavigationBar;
