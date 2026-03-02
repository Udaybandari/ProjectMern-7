import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto">
      
      <div className="relative w-full max-w-2xl p-4">
        
        <div className="bg-white rounded-xl shadow-lg">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 14 14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 1l12 12M13 1L1 13"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;