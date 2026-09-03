import { JSX } from "react";
import SimpleSmallButtonUI from "./UI/SimpleSmallButtonUI/SimpleSmallButtonUI";
import { useMelodyStore } from "../store/melodyStore";
import { IoMdAddCircle } from "react-icons/io";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { RTTTLMelody } from "../configs/default_melodies";

const AddNewMelodyButton = (): JSX.Element => {
  const { currentList, setCurrentList } = useMelodyStore();
  const queryClient = new QueryClient();
  

  const mutationPOSTMelodyById = useMutation({
    mutationFn: async ( newMelody: RTTTLMelody ) => {
      let response
      if(!newMelody.id) {
        console.log(`post, ${newMelody.id}-${newMelody.title}`)
        response = await fetch("https://pg-melody-server-2.onrender.com/melodies", {method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMelody)})
        queryClient.invalidateQueries({ queryKey: ['currentList'] });
        const newObject = await response.json();
        setCurrentList([
          newObject,
          ...currentList,
        ]);

      }      
    }
  }) 

  return (
    <SimpleSmallButtonUI
      title="Add new"
      onClick={() => {
        const timestamp = new Date().getTime().toString();
        const newMelody = {
            title: timestamp,
            code: `${timestamp.substring(timestamp.length - 10, timestamp.length)}:d=4,o=5,b=120:`,
          }
        mutationPOSTMelodyById.mutate(newMelody)
      }}
    >
      <IoMdAddCircle style={{ width: "1.3rem", height: "1.3rem" }} />
    </SimpleSmallButtonUI>
  );
};

export default AddNewMelodyButton;
