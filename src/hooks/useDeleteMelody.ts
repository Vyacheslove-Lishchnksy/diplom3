import { useMelodyStore } from "../store/melodyStore";
import { RTTTLMelody } from "../configs/default_melodies";

interface IUseDeleteMelodyProps {
  melody: RTTTLMelody;
}

const useDeleteMelody = ({ melody }: IUseDeleteMelodyProps) => {
  const { currentList, setCurrentList } = useMelodyStore((state) => state);

  return () =>
    setCurrentList(currentList.filter((m) => m.title !== melody.title));
};
export default useDeleteMelody;
