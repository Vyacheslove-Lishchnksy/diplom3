import { create } from "zustand";
import RTTTL_LIBRARY, { RTTTLMelody } from "../configs/default_melodies";
import { createJSONStorage, persist } from "zustand/middleware";
import { DeviceStatus } from "../api/actions";
import { TOutputMode } from "../configs/defaultOptions";

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

interface RTTTLStore {
  name: string;
  tempo: number;
  octave: number;
  noteDuration: number;
  code: string;

  setName: (name: string) => void;
  setTempo: (duration: number) => void;
  setOctave: (octave: number) => void;
  setNoteDuration: (noteDuration: number) => void;
  setCode: (code: string) => void;

  reset: () => void;
}

const initialState = {
  name: "Unnamed",
  tempo: 120,
  octave: 5,
  noteDuration: 4,
  code: "",
};

export const useRTTTLStore = create<RTTTLStore>((set) => ({
  ...initialState,

  setName: (name) => set({ name }),
  setTempo: (tempo) => set({ tempo: tempo }),
  setOctave: (octave) => set({ octave }),
  setNoteDuration: (noteDuration) => set({ noteDuration }),
  setCode: (code) => {
    set({ code });
  },

  reset: () => set(initialState),
}));

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
