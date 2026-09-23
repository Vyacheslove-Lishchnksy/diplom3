import { ILangSet, locales } from "../configs/lang";
import { EnglishSet } from "../configs/lang/en";
import { useLocaleStore } from "../store/stateStore"; 

export const useLocalization = ():  Required<ILangSet> => {
  const lang = useLocaleStore((store) => store.lang);

  const currentLocale = locales[lang] ?? {};
  const langSet: ILangSet = {};

  for (const key of Object.keys(EnglishSet) as Array<keyof ILangSet>) {
    langSet[key] = currentLocale[key] ?? EnglishSet[key];
  }

  return langSet as Required<ILangSet>;
};
