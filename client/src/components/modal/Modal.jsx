import React from 'react';
import './modal.css';
const Modal = ({ setOpenModal, hotelId }) => {
  const onCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping cart?</h4>
        <div className="btn-container">
          {/* <button className="btn confirm-btn" onClick={onClearModal}>
            Confirm
          </button> */}
          <button className="btn clear-btn" onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
