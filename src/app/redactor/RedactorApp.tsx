"use client";

import { useState } from "react";
import styles from "./RedactorApp.module.scss";
import { useRTTTLStore } from "@/src/store/melodyStore";
import RTTTL from "@/src/scripts/RTTTL";
import { octaves, notes, initValue } from "@/src/configs/redactorConfig";

const RedactorApp = () => {
  const [body, setBody] = useState(initValue);
  const setCode = useRTTTLStore((store) => store.setCode);

  return (
    <div
      className="w-full flex  items-start"
      style={{ overflow: "scroll", height: "60%" }}
    >
      <div className="flex w-4" style={{ flexDirection: "column-reverse" }}>
        {octaves.map((octave, octaveIndex) =>
          notes.map((note, noteIndex) => (
            <div
              key={`${octaveIndex}-${noteIndex}`}
              className="flex h-8 items-center border border-gray-300 w-full text-xs justify-center"
            >
              <span>
                {note}
                {octave}
              </span>
            </div>
          )),
        )}
      </div>
      <div className="flex ">
        {body.map((column, index) => {
          return (
            <div key={index} className="flex flex-col ">
              {column.map((cell, cellIndex) => (
                <div
                  key={`${index}-${cellIndex}`}
                  className={`flex gap-2 items-center text-transparent border border-gray-300 cursor-pointer p-0 m-0 ${styles.cell} ${cell ? styles.selected : ""}`}
                  style={{
                    height: "26px",
                    width: "32px",
                  }}
                  onMouseDownCapture={() => {
                    const huntedCellIndex = body[index].findIndex(
                      (item) => item,
                    );
                    if (huntedCellIndex > -1 && huntedCellIndex !== cellIndex) {
                      body[index][huntedCellIndex] = false;
                    }
                    const newBody = body.map((col) => [...col]);
                    newBody[index][cellIndex] = !newBody[index][cellIndex];
                    setCode(new RTTTL().getCode(newBody));
                    setBody(newBody);
                  }}
                ></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RedactorApp;
