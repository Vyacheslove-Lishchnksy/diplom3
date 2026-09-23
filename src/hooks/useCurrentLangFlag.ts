import { useLocaleStore } from "../store/stateStore";

export const useCurrentLangFlag = () => {
  const lang = useLocaleStore((store) => store.lang);
  if (lang === "en") {
    return "/assets/united-kingdom-uk-svgrepo-com.svg";
  } else if (lang === "uk") {
    return "/assets/flag-for-flag-ukraine-svgrepo-com.svg";
  }
};
