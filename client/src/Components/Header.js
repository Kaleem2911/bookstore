import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoBookOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-800 shadow-md">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-white">
          <IoBookOutline className="text-3xl" />
          <h1 className="font-serif text-2xl">Book Shelf</h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-5 text-white">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/AllBooks" className="hover:text-blue-400">All Books</Link>
          {isLoggedIn === true &&  (
            <>
              <Link to="/Cart" className="hover:text-blue-400">Cart</Link>
              <Link to="/profile" className="hover:text-blue-400">Profile</Link>
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          {!isLoggedIn && (
            <>
              <Link to="/Login" className="border border-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                Login
              </Link>
              <Link to="/Signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-start space-y-4 p-4 bg-slate-900">
            <Link to="/" className="text-white hover:text-blue-400" onClick={toggleMenu}>Home</Link>
            <Link to="/AllBooks" className="text-white hover:text-blue-400" onClick={toggleMenu}>All Books</Link>
            {isLoggedIn && (
              <>
                <Link to="/Cart" className="text-white hover:text-blue-400" onClick={toggleMenu}>Cart</Link>
                <Link to="/profile" className="text-white hover:text-blue-400" onClick={toggleMenu}>Profile</Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/Login" className="text-white hover:text-blue-400" onClick={toggleMenu}>Login</Link>
                <Link to="/Signup" className="text-white hover:text-blue-400" onClick={toggleMenu}>Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
