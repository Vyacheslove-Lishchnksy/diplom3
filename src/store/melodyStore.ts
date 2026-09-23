import { create } from "zustand";
import  { RTTTLMelody } from "../configs/default_melodies";
import { createJSONStorage, persist } from "zustand/middleware";


interface MelodyState {
  currentList: RTTTLMelody[];
  setCurrentList: (newList: RTTTLMelody[]) => void;
}

export const useMelodyStore = create<MelodyState>()(
  persist(
    (set) => ({
      currentList: [],
      setCurrentList: (newList: RTTTLMelody[]) => {
        set({ currentList: newList });
      },
    }),
    {
      name: "MelodyList",
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
    },
  ),
);

interface MQTTStore {
  deviceId: string;
  setDeviceId: (id: string) => void;
  deviceIdList: string[];
  addDeviceId: (id: string) => void;
  removeDeviceId: (id: string) => void;
}

export const useMQTTStore = create<MQTTStore>()(
  persist(
    (set) => ({
      deviceId: "",
      setDeviceId: (id) => {
        set({ deviceId: id });
      },
      deviceIdList: [],
      addDeviceId: (id) => {
        set((state) => ({
          deviceIdList: state.deviceIdList.includes(id)
            ? state.deviceIdList
            : [...state.deviceIdList, id],
        }));
      },
      removeDeviceId: (id) => {
        set((state) => ({
          deviceIdList: state.deviceIdList.filter(
            (deviceId) => deviceId !== id,
          ),
        }));
      },
    }),
    {
      name: "mqttInfo",
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
    },
  ),
);
