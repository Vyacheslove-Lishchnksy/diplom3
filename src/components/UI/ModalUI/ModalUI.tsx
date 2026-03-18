import useOutsideClick from "@/src/hooks/useOutsideClick";
import React, { RefObject, useEffect, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";

export interface ModalUIPosition {
  x: number;
  y: number;
}

export interface ModalUIProps {
  position: ModalUIPosition;
  children: React.ReactNode;
  closeModal: () => void;
  supportContext?: RefObject<HTMLElement> | RefObject<null>;
}

export const ModalUI: React.FC<ModalUIProps> = ({
  position,
  children,
  closeModal,
  supportContext,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      closeModal();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [closeModal]);

  useOutsideClick(
    modalRef,
    () => {
      closeModal();
    },
    supportContext?.current ? [supportContext] : undefined,
  );

  return (
    <div
      ref={modalRef}
      style={{
        position: "fixed",
        width: "300px",
        left: position.x,
        top: position.y,
        zIndex: 1000,
        minHeight: "50px",
      }}
      className="bg-gray-950 relative rounded-b-2xl border-gray-100 border"
    >
      <button
        className="text-2xl absolute top-2 right-2 text-gray-700 hover:text-gray-500 cursor-pointer "
        onClick={closeModal}
        tabIndex={25}
      >
        <MdOutlineClose />
      </button>
      {children}
    </div>
  );
};
