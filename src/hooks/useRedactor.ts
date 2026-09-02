import { useState, useMemo } from "react";
import { useMelodyStore } from "@/src/store/melodyStore";
import RTTTL from "@/src/scripts/RTTTL";
import { useRTTTLStore } from "../store/RTTTLStore";

export const useRedactor = () => {
  const {
    name,
    setName,
    tempo,
    setTempo,
    noteDuration,
    setNoteDuration,
    code,
  } = useRTTTLStore((store) => store);

  const { currentList, setCurrentList } = useMelodyStore((store) => store);
  const [isNameError, setIsNameError] = useState(false);

  const currentCode = useMemo(() => {
    const rtttl = new RTTTL();
    rtttl.setName(name);
    rtttl.setDuration(tempo);
    rtttl.setNodeDuration(noteDuration);
    return rtttl.getRTTTL(code);
  }, [name, tempo, noteDuration, code]);

  const handleNameChange = (newName: string) => {
    setName(newName);
    const exists = currentList.some((melody) => melody.title === newName);
    setIsNameError(exists);
  };

  const handleCreate = () => {
    if (isNameError || !name.trim()) return;

    const newMelody = {
      title: name,
      code: currentCode,
    };

    setCurrentList([...currentList, newMelody]);
  };

  return {
    name,
    tempo,
    noteDuration,
    currentCode,
    isNameError,
    handleNameChange,
    setTempo,
    setNoteDuration,
    handleCreate,
  };
};
