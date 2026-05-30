"use client";
import { useRef, useState, RefObject, memo } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { BsFillTrash3Fill } from "react-icons/bs";
import { RTTTLMelody } from "../configs/default_melodies";
import MiniRedactor from "./MiniRedactor";
import SimpleSmallButtonUI from "./UI/SimpleSmallButtonUI/SimpleSmallButtonUI";
import styles from "./MelodyMenuItem.module.scss";
import PlayButton from "./PlayButton";
import useDeleteMelody from "../hooks/useDeleteMelody";

const MelodyMenuItem = ({ melody }: { melody: RTTTLMelody }) => {
  const [isRedacting, setIsRedacting] = useState(false);
  const deleteMelody = useDeleteMelody({ melody });
  const callRedactorButton = useRef<HTMLButtonElement>(null);

  return (
    <div
      className={`flex w-full cursor-pointer py-2 px-4 rounded-2xl justify-between items-center ${styles.MenuItem}`}
    >
      <PlayButton melody={melody} />
      <MiniRedactor
        melody={melody}
        isRedacting={isRedacting}
        setIsRedacting={setIsRedacting}
        callButtonRef={callRedactorButton as RefObject<HTMLElement>}
      />
      <div className="flex flex-col gap-1">
        <SimpleSmallButtonUI
          ref={callRedactorButton}
          onClick={() => setIsRedacting(!isRedacting)}
        >
          <HiMiniPencilSquare />
        </SimpleSmallButtonUI>
        <SimpleSmallButtonUI onClick={deleteMelody}>
          <BsFillTrash3Fill />
        </SimpleSmallButtonUI>
      </div>
    </div>
  );
};

export default memo(MelodyMenuItem);
