import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo2.jpg';

const Header = () => {
  return (
    <header className="bg-green-900">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">

        <Link to="/" className="flex items-center text-white">
          <img src={logoImg} alt="Farmtech Fusion Logo" className="h-10 w-auto mr-2" />
          <span className="text-xl font-bold">Crop Life</span>
        </Link>
        

        <div className="flex items-center ">
          <div className="text-lg flex-grow">
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/photogallery">Photo Gallery</NavLink>

            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/blogging">Farm Product Blog</NavLink>
            <NavLink to="/product">Product Item</NavLink>
          </div>
        </div>
        

        <button
          className="block lg:hidden focus:outline-none text-white"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 6h16a1 1 0 010 2H4a1 1 0 010-2zm16 5H4a1 1 0 010-2h16a1 1 0 110 2zm0 4H4a1 1 0 010-2h16a1 1 0 110 2z"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
};

// NavLink Component for consistent styling
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4"
  >
    {children}
  </Link>
);

export default Header;
