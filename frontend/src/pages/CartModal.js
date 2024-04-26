import Modal from 'react-modal';
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
      className="flex relative flex-col max-w-lg bg-gray-50 text-gray-800"
    >
      <div className="p-6 space-y-4 divide-y divide-gray-300">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        <div className="overflow-y-auto max-h-80">
          <ul className="flex flex-col pt-4 space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex items-start justify-between">
                <h3>
                  {item.name}
                  <span className="text-sm text-yellow-600">x{item.quantity}</span>
                </h3>
                <div className="text-right">
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  <span className="text-sm text-gray-600">₹{item.price.toFixed(2)}</span>
                </div>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{calculateTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button className="absolute top-4 right-4" onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CartModal;
