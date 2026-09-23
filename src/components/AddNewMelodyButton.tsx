import { JSX } from "react";
import SimpleSmallButtonUI from "./UI/SimpleSmallButtonUI/SimpleSmallButtonUI";
import { useMelodyStore } from "../store/melodyStore";
import { IoMdAddCircle } from "react-icons/io";
import { useCreateMelody } from "../hooks/useCreateMelody";

const AddNewMelodyButton = (): JSX.Element => {
  const { currentList, setCurrentList } = useMelodyStore();
  const createMelody = useCreateMelody({
    onSuccess: (newMelody) => {
      setCurrentList([newMelody, ...currentList]);
    },
  });

  return (
    <SimpleSmallButtonUI
      title="Add new"
      onClick={() => {
        const timestamp = new Date().getTime().toString();
        const newMelody = {
            title: timestamp,
            code: `${timestamp.substring(timestamp.length - 10, timestamp.length)}:d=4,o=5,b=120:`,
          }
        createMelody.mutate(newMelody);
      }}
    >
      <IoMdAddCircle style={{ width: "1.3rem", height: "1.3rem" }} />
    </SimpleSmallButtonUI>
  );
};

export default AddNewMelodyButton;
