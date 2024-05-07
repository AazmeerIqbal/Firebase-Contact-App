import React from "react";
import { createPortal } from "react-dom";
import { MdOutlineCancel } from "react-icons/md";

const Model = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="absolute inset-0 flex justify-center items-center z-50">
            <div className=" min-h-[200px] md:w-[40%] sm:w-[50%] w-[70%] bg-white p-4 z-50 relative rounded-lg">
              <div className="flex justify-end">
                <MdOutlineCancel
                  className="text-2xl cursor-pointer"
                  onClick={onClose}
                />
              </div>
              {children}
            </div>
            <div
              onClick={onClose}
              className="backdrop-blur h-screen w-screen absolute top-0 z-40"
            ></div>
          </div>
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Model;
