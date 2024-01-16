const Cart = ({ cart }) => {
    console.log('Cart items:', cart);
    return (
      <div>
        <h1>Your Shopping Cart</h1>
        {cart && cart.length > 0 ? (
          <div>
            {cart.map((product) => (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
              </div>
            ))}
            <p>Total Price: ${cart.reduce((total, product) => total + product.price, 0)}</p>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    );
  };
  
  export default Cart;
  