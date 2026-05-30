import { ILangSet, locales } from "../configs/lang";
import { useStateStore } from "../store/melodyStore";

export const useLocalization = (): ILangSet => {
  const lang = useStateStore((store) => store.lang);

  return locales[lang];
};
