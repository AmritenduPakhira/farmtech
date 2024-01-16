import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo2.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Header() {
  const logoStyle = {
    height: '40px',
    width: 'auto',
    marginRight: '10px',
    transform: 'scale(1.2)', // Initial scale
    transition: 'transform 0.3s ease-in-out', // Add transition for smooth scaling
  };

  const darkGreen = {
    background: '#006400', // Dark green color code
  };

  return (
    <div className="header">
      <nav className="darkgreen navbar navbar-expand-lg navbar-dark fixed-top" style={darkGreen}>
        <Link className="navbar-brand mx-auto" to="home">
          <img src={logoImg} alt="Farmtech Fusion Logo" className="logo-img" style={logoStyle} />
          Crop Life
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Photogallery">
                Photo Gallery
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">
                Login Page
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogging">
                Farm Product Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Product Item
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
