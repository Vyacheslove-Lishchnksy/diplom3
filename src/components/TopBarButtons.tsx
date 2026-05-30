"use client";

import { PiPlugsConnected } from "react-icons/pi";
import { MODAL_STATES } from "@/src/configs/modalConfig";
import { JSX, useRef, useState } from "react";
import { TModalState } from "@/src/configs/defaultOptions";
import { FaRegFileCode } from "react-icons/fa";
import { SimpleButtonUI } from "./UI/SimpleButtonUI/SimpleButtonUI";
import { ModalUI } from "./UI/ModalUI/ModalUI";

const TopBarButtons = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState<TModalState>("connectMenu");

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ x: rect.right - 300, y: rect.bottom });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div
        className="flex ml-4 mt-4"
        style={{
          gap: "2px",
        }}
        ref={buttonRef}
      >
        <SimpleButtonUI
          title="File work"
          tabIndex={1}
          onClick={() => {
            setModalState("fileMenu");
            handleButtonClick();
          }}
        >
          <FaRegFileCode />
        </SimpleButtonUI>
        <SimpleButtonUI
          title="Change id"
          tabIndex={10}
          onClick={() => {
            setModalState("connectMenu");
            handleButtonClick();
          }}
        >
          <PiPlugsConnected />
        </SimpleButtonUI>
      </div>
      {showModal && (
        <ModalUI
          position={position}
          closeModal={closeModal}
          supportContext={buttonRef}
        >
          {MODAL_STATES[modalState]}
        </ModalUI>
      )}
    </>
  );
};

export default TopBarButtons;
