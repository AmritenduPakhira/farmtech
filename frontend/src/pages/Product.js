import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FiShoppingCart} from 'react-icons/fi'
import CartModal from './CartModal'; 
import toast, { Toaster } from 'react-hot-toast';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const ProductList = ({user}) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://farmtech-vert.vercel.app/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useGSAP(()=>{
    gsap.from(".product-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(product.name + " added!")
  };
  

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div><Toaster/></div>
      <header className='flex justify-between '>
      <h1 className="text-3xl font-bold mb-4">
        Available Agricultural Products
      </h1>
        <button className="ml-4 px-4 py-1 text-green-600 hover:text-green-500 rounded text-3xl" onClick={openCartModal}><FiShoppingCart/></button>
      </header>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search Product..."
          className="border border-gray-300 px-4 py-2 rounded-l"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600" onClick={handleSearch}>Search</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 product-card">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">Price: ₹{product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <CartModal
        isOpen={isCartModalOpen}
        onRequestClose={closeCartModal}
        cart={cart}
        user={user}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default ProductList;
