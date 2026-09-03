import { useMelodyStore } from "../store/melodyStore";
import { RTTTLMelody } from "../configs/default_melodies";
import { useMutation } from "@tanstack/react-query";

interface IUseDeleteMelodyProps {
  melody: RTTTLMelody;
}

const useDeleteMelody = ({ melody }: IUseDeleteMelodyProps) => {
  const { currentList, setCurrentList } = useMelodyStore((state) => state);
  const deleteMutation = useMutation({
    mutationFn: async (id: string | undefined) => {
      console.log(`id ${id}`)
      let response
      if(id) {
        response = await fetch(`https://pg-melody-server-2.onrender.com/melodies/${id}`, {method: "DELETE" })
        return response.json();
      } 
    }
  })


  if (!melody) {
    return
  }

  return () =>{
    console.log("delete");
    setCurrentList(currentList.filter((m) => {
      if (!m) {
        return
      }
      return m.title !== melody.title
    }));
    deleteMutation.mutate(melody.id)
  }
};
export default useDeleteMelody;
