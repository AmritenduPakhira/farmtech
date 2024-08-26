import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Homepage';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/AboutUs';
import Blogging from './pages/Farmb';
import PostBlog from './pages/PostBlog';
import PhotoGallery from './pages/PhotoGallery';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import Product from './pages/Product';
import PaymentSuccess from './pages/PaymentSuccess';
import { getAuth, signOut } from "firebase/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Register onLogin={handleLogin} />} />
          <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
          <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/about" element={loggedIn ? <About /> : <Navigate to="/" />} />
          <Route path="/blogging" element={loggedIn ? <Blogging /> : <Navigate to="/" />} />
          <Route path="/postblog" element={loggedIn ? <PostBlog /> : <Navigate to="/" />} />
          <Route path="/photogallery" element={loggedIn ? <PhotoGallery /> : <Navigate to="/" />} />
          <Route path="/contact" element={loggedIn ? <ContactUs /> : <Navigate to="/" />} />
          <Route path="/product" element={loggedIn ? <Product user={user} /> : <Navigate to="/" />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="*" element={loggedIn ? <Home /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
