import { useLocaleStore } from "../store/stateStore";

export const useCurrentLangFlag = () => {
  const lang = useLocaleStore((store) => store.lang);
  if (lang === "en") {
    return "\u{1F1EC}\u{1F1E7}";
  } else if (lang === "uk") {
    return "\u{1F1FA}\u{1F1E6}";
  }
};
