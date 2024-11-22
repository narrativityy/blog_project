import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = () => {
    Axios.post('http://localhost:8001/api/users/logout', {}, { withCredentials: true })
      .then(res => {
        navigate('/');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Determine if the screen is small
  const isSmallScreen = window.innerWidth < 768;

  return (
    <nav className="bg-teal-700 shadow-md rounded">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h3 className={`text-xl font-bold text-white ${!isSmallScreen ? 'transition-transform duration-300 hover:scale-105' : ''}`}>
              <Link to="/">Blog</Link>
            </h3>
          </div>
          <div className="hidden md:flex gap-4">
            <Link to="/post/create" className={`text-md text-white ${!isSmallScreen ? 'transition-transform duration-300 hover:scale-105' : ''}`}>
              Create Post
            </Link>
            <Link to="/profile" className={`text-md text-white ${!isSmallScreen ? 'transition-transform duration-300 hover:scale-105' : ''}`}>
              {Cookies.get('username')}
            </Link>
            <span
              className={`text-md text-white cursor-pointer ${!isSmallScreen ? 'transition-transform duration-300 hover:scale-105' : ''}`}
              onClick={logoutHandler}
            >
              Logout
            </span>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/post/create" className="block text-md text-white">
              Create Post
            </Link>
            <Link to="/profile" className="block text-md text-white">
              {Cookies.get('username')}
            </Link>
            <span
              className="block text-md text-white cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;