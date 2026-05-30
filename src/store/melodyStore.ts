import { create } from "zustand";
import RTTTL_LIBRARY, { RTTTLMelody } from "../configs/default_melodies";
import { createJSONStorage, persist } from "zustand/middleware";


interface MelodyState {
  currentList: RTTTLMelody[];
  setCurrentList: (newList: RTTTLMelody[]) => void;
}

export const useMelodyStore = create<MelodyState>()(
  persist(
    (set) => ({
      currentList: RTTTL_LIBRARY,
      setCurrentList: (newList: RTTTLMelody[]) => {
        set({ currentList: newList });
      },
    }),
    {
      name: "currentList",
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
    },
  ),
);

interface MQTTStore {
  deviceId: string;
  setDeviceId: (id: string) => void;
}

export const useMQTTStore = create<MQTTStore>()(
  persist(
    (set) => ({
      deviceId: "",
      setDeviceId: (id) => {
        set({ deviceId: id });
      },
    }),
    {
      name: "mqttInfo",
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
    },
  ),
);
