import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Book Shelf</h2>
              <p className="mt-1 text-sm text-gray-400">
                Your gateway to discovering knowledge, stories, and inspiration.
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 my-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h3 className="font-bold text-base">Explore</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/AllBooks" className="hover:text-white">
                    All Books
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-white">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-white">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-base">Support</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-400">
                <li>
                  <Link to="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-base">Legal</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-400">
                <li>
                  <Link to="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/license" className="hover:text-white">
                    License
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-base">Subscribe</h3>
              <p className="mt-2 text-sm text-gray-400">
                Get the latest updates and offers.
              </p>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-4">
            <p className="text-center text-xs text-gray-400">
              © 2024 Book Shelf. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
