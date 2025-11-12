import { CircleX } from 'lucide';
import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-[80%] h-10/12 z-1000 text-black p-3 flex rounded-2xl  bg-transparent backdrop-blur-2xl border-white border-2 fixed left-[15%] top-[10%] " onClick={onClose}>
      <div className='w-full'
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full  gentium-plus-bold h-[20px]">
          <h3 className="modal-title">{title}</h3>
          <button className="w-[20px] h-[20px] flex text-white items-center justify-center p-3 border-white border rounded-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex w-full h-full p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;