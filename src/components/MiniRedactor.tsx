import { JSX, KeyboardEvent, RefObject, useRef, useState } from "react";
import { RTTTLMelody } from "../configs/default_melodies";
import InputUI from "./UI/InputUI/InputUI";
import { useMelodyStore } from "../store/melodyStore";
import useOutsideClick from "../hooks/useOutsideClick";
import ErrorTextUI, { IErrorFormat } from "./UI/ErrorTextUI";
import { validateRTTTL } from "../scripts/RTTTLCheker";

interface MiniRedactorProps {
  melody: RTTTLMelody;
  isRedacting: boolean;
  setIsRedacting: (value: boolean) => void;
  callButtonRef: RefObject<HTMLElement>;
}

const MiniRedactor = ({
  melody,
  isRedacting,
  setIsRedacting,
  callButtonRef,
}: MiniRedactorProps): JSX.Element => {
  const [melodyTitle, setMelodyTitle] = useState(melody.title);
  const [melodyCode, setMelodyCode] = useState(melody.code);
  const { currentList, setCurrentList } = useMelodyStore((store) => store);
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputError, setInputError] = useState<IErrorFormat>({
    title: "",
    isError: false,
  });

  useOutsideClick(inputRef, () => {
    setIsRedacting(false);
  }, [callButtonRef]);

  function saveChanges(e: KeyboardEvent) {
    if (e.key === "Enter") {
      setCurrentList(
        currentList.map((item: RTTTLMelody) => {
          if (item.title !== melody.title || inputError.isError) {
            return item;
          } else {
            setIsRedacting(false);
            return {
              title: melodyTitle,
              code: melodyCode,
            };
          }
        }),
      );
    }
  }

  return (
    <div
      className="flex flex-col relative"
      ref={inputRef}
      style={{
        flex: "1",
        justifyContent: "start",
        height: "100%",
        gap: "4px",
        paddingTop: "6px",
      }}
    >
      {isRedacting ? (
        <>
          <InputUI
            className="mx-4"
            style={{ width: "250px" }}
            value={melodyTitle}
            onChange={(e) => {
              setMelodyTitle(e.target.value);
              if (!currentList.find((item) => item.title === melodyTitle)) {
                setInputError({
                  title: "Melodies can`t have the same name",
                  isError: true,
                });
                return;
              }
              setInputError({
                title: "",
                isError: false,
              });
            }}
            onKeyDown={saveChanges}
          />
          <ErrorTextUI
            isErrorValue={inputError.isError}
            style={{ right: "20px" }}
          >
            {inputError.title}
          </ErrorTextUI>
        </>
      ) : (
        <h2 className="mx-4">{melody.title}</h2>
      )}

      {isRedacting ? (
        <InputUI
          className="w-4/5"
          style={{ marginInline: "1rem" }}
          value={melodyCode}
          onChange={(e) => {
            setMelodyCode(e.target.value);
            const error = validateRTTTL(e.target.value);
            setInputError(error);
          }}
          onKeyDown={saveChanges}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MiniRedactor;
