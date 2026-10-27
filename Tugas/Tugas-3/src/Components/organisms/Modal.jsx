// Organism: pop-up umum, isinya bebas lewat children
const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-96 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button type="button" onClick={onClose} className="text-gray-600 hover:text-red-500 text-2xl leading-none cursor-pointer">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
