import { ILangSet, locales } from "../configs/lang";
import { useLocaleStore } from "../store/stateStore"; 

export const useLocalization = (): ILangSet => {
  const lang = useLocaleStore((store) => store.lang);

  return locales[lang];
};
