import Modal from "react-modal";
import React from "react";
import axios from "axios";
import logo from "../images/logo2.jpg"

const CartModal = ({ isOpen, onRequestClose, cart, removeFromCart,user }) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const customStyles = {
    content: {
      width: "40%",
      maxWidth: "640px",
      margin: "auto",
    },
  };

  const handleCheckout = async (amount) => {

    const { data: key } = await axios.get(
      "https://farmtech-nine.vercel.app/api/getkey"
    );


    const {
      data: { order },
    } = await axios.post("https://farmtech-nine.vercel.app/api/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: user.email,
      description: "see you again",
      image: "https://cdn.vectorstock.com/i/1000x1000/60/12/corn-logo-vector-44556012.webp",
      order_id: order.id,
      callback_url: "https://farmtech-nine.vercel.app/api/paymentverification",
      prefill: {
        name: user.email,
        email: user.email,
        contact: "9408618999",
      },
      notes: {
        address: user.username+" address",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart Modal"
      style={customStyles}
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      shouldCloseOnOverlayClick={true}
    >
      <div className="p-6 space-y-4 divide-y divide-gray-300">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <div className="overflow-y-auto max-h-80">
            <ul className="flex flex-col pt-4 space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex items-start justify-between">
                  <h3>
                    {item.name}
                    <span className="text-sm text-green-600">
                      {" "}
                      x{item.quantity}
                    </span>
                  </h3>
                  <div className="text-right">
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    <span className="text-sm text-gray-600">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {cart.length > 0 && (
          <div className="pt-4 flex justify-center flex-col space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{calculateTotalPrice().toFixed(2)}</span>
            </div>
            <button
              className="bg-green-500 mx-auto text-white px-4 py-2 rounded"
              onClick={()=>handleCheckout(calculateTotalPrice().toFixed(2))}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      <button className="absolute top-4 right-4" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

export default CartModal;
