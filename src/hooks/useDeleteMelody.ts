import { useMelodyStore } from "../store/melodyStore";
import { RTTTLMelody } from "../configs/default_melodies";
import { useMutation } from "@tanstack/react-query";
import { instanceMelodiesDatabase } from "../api/Database";

interface IUseDeleteMelodyProps {
  melody: RTTTLMelody;
}

const useDeleteMelody = ({ melody }: IUseDeleteMelodyProps) => {
  const { currentList, setCurrentList } = useMelodyStore((state) => state);
  const deleteRequest = useMutation({
    mutationFn: instanceMelodiesDatabase.deleteMelody
  })


  if (!melody) {
    return
  }

  return () =>{
    setCurrentList(currentList.filter((m) => {
      if (!m) {
        return
      }
      return m.title !== melody.title
    }));
    deleteRequest.mutate(melody.id)
  }
};
export default useDeleteMelody;
