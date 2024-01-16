
import Modal from 'react-modal';
// CartModal.js
import React from 'react';

const CartModal = ({ isOpen, onRequestClose, cart, removeFromCart }) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart Modal"
    >
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <div>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>
                Remove from Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total Price: ${calculateTotalPrice()}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CartModal;
