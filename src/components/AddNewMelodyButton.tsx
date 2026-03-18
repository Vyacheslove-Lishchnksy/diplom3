import { JSX } from "react";
import SimpleSmallButtonUI from "./UI/SimpleSmallButtonUI/SimpleSmallButtonUI";
import { useMelodyStore } from "../store/melodyStore";
import { IoMdAddCircle } from "react-icons/io";

const AddNewMelodyButton = (): JSX.Element => {
  const { currentList, setCurrentList } = useMelodyStore();

  return (
    <SimpleSmallButtonUI
      title="Add new"
      onClick={() => {
        const timestamp = new Date().getTime().toString();
        setCurrentList([
          {
            title: timestamp,
            code: `${timestamp.substring(timestamp.length - 10, timestamp.length)}:d=4,o=5,b=120:`,
          },
          ...currentList,
        ]);
      }}
    >
      <IoMdAddCircle style={{ width: "1.3rem", height: "1.3rem" }} />
    </SimpleSmallButtonUI>
  );
};

export default AddNewMelodyButton;
