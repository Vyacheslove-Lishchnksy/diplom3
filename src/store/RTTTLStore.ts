import { create } from "zustand";

export interface RTTTLStore {
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

