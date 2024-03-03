import Image from "next/image";
import React from "react";

type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
};
const Modal = ({ onClose, isOpen }: ModalProps) => {
  if (isOpen)
    return (
      <div className="fixed z-40 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="flex w-80 flex-col gap-4 items-center bg-white p-8 rounded-lg">
          <div className="text-2xl font-bold w-full flex items-center justify-between">
            <span>RULES</span>
            <button onClick={onClose}>
              <Image
                src={"/images/icon-close.svg"}
                alt="close"
                height={20}
                width={20}
              />
            </button>
          </div>
          <div className="mt-4 w-[200px]">
            <Image
              src={"/images/image-rules.svg"}
              alt="rules"
              height={200}
              width={200}
            />
          </div>
        </div>
      </div>
    );
  else return null;
};

export default Modal;
