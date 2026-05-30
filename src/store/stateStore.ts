import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DeviceStatus } from "../api/actions";
import { TLangCode, TOutputMode } from "../configs/defaultOptions";

interface StateStore {
  currentStatus: DeviceStatus;
  setStatus: (state: DeviceStatus) => void;
  search: string;
  setSearch: (state: string) => void;
  currentOutputMode: TOutputMode;
  setOutputMode: (state: TOutputMode) => void;
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
  
}

export const useStateStore = create<StateStore>((set) => ({
  currentStatus: { state: "online", melody: null },
  setStatus: (state) => {
    set({ currentStatus: state });
  },
  search: "",
  setSearch: (state) => {
    set({ search: state });
  },
  currentOutputMode: "deviceOutput",
  setOutputMode: (state) => {
    set({ currentOutputMode: state });
  },
  isPlaying: false,
  setIsPlaying: (state) => {
    set({ isPlaying: state });
  },
 }));

interface LocaleState {
  lang: TLangCode;
  setLang: (lang: TLangCode) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      lang: "uk",
      setLang: (lang) => {
        set({ lang });
      },
    }),
    {
      name: "currentLocale",
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
    },
  ),
);

