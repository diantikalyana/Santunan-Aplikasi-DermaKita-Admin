import React from "react";

const Alertmodal = ({
  isOpen,
  title,
  message,
  confirmText = "OK",
  cancelText = "Batal",
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div className="bg-gradient-to-b from-[#836d91] via-[#8c809c] to-[#cab6e4] rounded-lg shadow-lg w-full max-w-md p-6 z-[1000]">
        <h2 className="text-xl font-bold text-gray-100 mb-4">{title}</h2>
        <p className="text-gray-200 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#5a4b64] text-white rounded hover:bg-[#846e92]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alertmodal;
