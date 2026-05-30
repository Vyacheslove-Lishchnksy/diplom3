"use client";

import { FaFileDownload, FaFileUpload } from "react-icons/fa";
import { ButtonUI } from "./UI/ButtonUI";
import { rtttlFileInstance } from "../scripts/RTTTLFile";
import { useMelodyStore } from "../store/melodyStore";
import { useState } from "react";
import { useLocalization } from "../hooks/useLocalization";

export const FileMenu = () => {
  const currentList = useMelodyStore((state) => state.currentList);
  const setCurrentList = useMelodyStore((state) => state.setCurrentList);
  const lang = useLocalization();

  const [isLoadFile, setIsLoadFile] = useState(false);

  return (
    <form className="flex justify-center items-center p-4 flex-col gap-4 min-h-32">
      {!isLoadFile ? (
        <div className="flex gap-2">
          <ButtonUI
            tabIndex={2}
            onClick={() => {
              rtttlFileInstance.getFile(currentList);
            }}
          >
            <span>{lang.ExportButtonText}</span> <FaFileDownload />
          </ButtonUI>
          <ButtonUI
            tabIndex={3}
            onClick={() => {
              setIsLoadFile(true);
            }}
          >
            <span>{lang.ImportButtonText}</span> <FaFileUpload />
          </ButtonUI>
        </div>
      ) : (
        <>
          <input
            tabIndex={2}
            type="file"
            id="fileInput"
            className="w-full h-full border mt-4 px-2 py-4"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const content = event.target?.result;
                    if (typeof content === "string") {
                      const melodies = JSON.parse(content);
                      setCurrentList(melodies);
                      setIsLoadFile(false);
                    }
                  } catch (error) {
                    console.error("Error parsing file:", error);
                  }
                };
              }
            }}
          ></input>
          <ButtonUI
            tabIndex={3}
            onClick={() => {
              setIsLoadFile(false);
            }}
          >
            {lang.UploadButtonTitle}
          </ButtonUI>
        </>
      )}
    </form>
  );
};
