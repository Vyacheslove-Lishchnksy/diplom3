import { useStateStore } from "../store/melodyStore";

export const useCurrentLangFlag = () => {
  const lang = useStateStore((store) => store.lang);
  if (lang === "en") {
    return "\u{1F1EC}\u{1F1E7}";
  } else if (lang === "uk") {
    return "\u{1F1FA}\u{1F1E6}";
  }
};
