import { JSX } from "react";
import SimpleSmallButtonUI from "./UI/SimpleSmallButtonUI/SimpleSmallButtonUI";
import { useMelodyStore } from "../store/melodyStore";
import { IoMdAddCircle } from "react-icons/io";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { RTTTLMelody } from "../configs/default_melodies";
import { instanceMelodiesDatabase } from "../api/Database";

const AddNewMelodyButton = (): JSX.Element => {
  const { currentList, setCurrentList } = useMelodyStore();
  const queryClient = new QueryClient();
  

  const postRequest = useMutation({
    mutationFn: async ( newMelody: RTTTLMelody ) => {
      let response
      if(!newMelody.id) {
        response = await instanceMelodiesDatabase.createMelody(newMelody);
        queryClient.invalidateQueries({ queryKey: ['currentList'] });

        if(response) {
          const newObject = await response.json();
          setCurrentList([
            newObject,
            ...currentList,
          ]);          
        }

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
        postRequest.mutate(newMelody)
      }}
    >
      <IoMdAddCircle style={{ width: "1.3rem", height: "1.3rem" }} />
    </SimpleSmallButtonUI>
  );
};

export default AddNewMelodyButton;
