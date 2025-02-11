import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoBookOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const Admin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-800 shadow-md">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-white space-x-2">
          <IoBookOutline className="text-4xl" />
          <h1 className="font-serif text-3xl font-semibold tracking-wide">
            Book Shelf
          </h1>
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-blue-400 transition">
            Home
          </Link>
          <Link
            to="/AllBooks"
            className="text-white hover:text-blue-400 transition"
          >
            All Books
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/addbook"
                className="text-white hover:text-blue-400 transition"
              >
                Add Book
              </Link>
              <Link
                to="/profile"
                className="text-white hover:text-blue-400 transition"
              >
                Profile
              </Link>
            </>
          )}
        </nav>
        <div className="hidden md:flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/Login"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/Signup"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Sign Up
              </Link>
            </>
          ) : null}
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-700 text-white">
          <nav className="flex flex-col space-y-3 px-5 py-4">
            <Link
              to="/"
              className="hover:text-blue-400 transition"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/AllBooks"
              className="hover:text-blue-400 transition"
              onClick={toggleMenu}
            >
              All Books
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/addbook"
                  className="hover:text-blue-400 transition"
                  onClick={toggleMenu}
                >
                  Add Book
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-blue-400 transition"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link
                  to="/Login"
                  className="hover:text-blue-400 transition"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/Signup"
                  className="hover:text-blue-400 transition"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Admin;
