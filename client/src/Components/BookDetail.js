import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { FiEdit2 } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";

const BookDetail = () => {
  const [details, setDetails] = useState(null);
  const [alert, setAlert] = useState(null);
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleAlert = (message, type) => setAlert({ message, type });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/get-book/${id}`);
        setDetails(data.book);
      } catch (error) {
        console.error("Error fetching book details:", error);
        handleAlert("Failed to fetch book details. Please try again later.", "error");
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleFavourites = async () => {
    try {
      const response = await axios.put('http://localhost:5000/add-book-to-favourites', {}, { headers });
      if (response.status === 200) {
        handleAlert('Book added to favorites', 'success');
      }
    } catch (error) {
      console.error('Error adding book to favorites:', error);
      handleAlert('Failed to add book to favorites. Please try again.', 'error');
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put('http://localhost:5000/addToCart', {}, { headers });
      if (response.status === 200) {
        handleAlert('Book added to cart', 'success');
      }
    } catch (error) {
      console.error('Error adding book to cart:', error);
      handleAlert('Failed to add book to cart. Please try again.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-books/${id}`, { headers });
      handleAlert(response.data.message || 'Book deleted successfully', 'success');
      navigate("/AllBooks");
    } catch (error) {
      console.error('Error deleting book:', error);
      handleAlert('Failed to delete book. Please try again.', 'error');
    }
  };

  if (!details) return <p className="text-center">Loading...</p>;

  return (
    <div className="h-screen flex items-center justify-center rounded-xl">
      <div className="flex justify-center items-center min-h-screen px-2 lg:px-0">
        <div className="w-full lg:w-2/3 flex flex-wrap lg:flex-nowrap gap-4 rounded-xl bg-white shadow-lg p-4 lg:p-6 border border-black">
          <div className="w-full lg:w-1/2 flex items-center justify-center rounded-md overflow-hidden bg-white">
            <img
              src={details.file}
              className="object-cover w-56 h-72 rounded-lg shadow-md"
              alt="Book Cover"
            />
          </div>
          <div className="w-full lg:w-1/2 lg:border-l border-gray-300 px-0 lg:px-4">
            <ul className="space-y-2">
              <li className="flex space-x-3">
                <h1 className="text-2xl lg:text-3xl font-bold font-playfair text-gray-800">
                  {details.title}
                </h1>
              </li>
              <li>
                <p className="text-sm lg:text-base text-gray-700">
                  <b className="font-semibold">Author:</b> {details.author}
                </p>
              </li>
              <li>
                <p className="text-sm lg:text-base text-gray-700">
                  <b className="font-semibold">Description:</b> {details.desc}
                </p>
              </li>
              <li>
                <p className="text-sm lg:text-base text-gray-700">
                  <b className="font-semibold">Language:</b> {details.language}
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p className="text-lg lg:text-xl font-bold text-green-600">
                  ₹{details.price}
                </p>
                {isLoggedIn && role === "user" && (
                  <div className="flex items-center space-x-4">
                    {alert && (
                      <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                      />
                    )}
                    <button
                      onClick={handleFavourites}
                      className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      <CiHeart className="text-2xl" />
                    </button>
                    <button
                      onClick={handleCart}
                      className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
                    >
                      <AiOutlineShoppingCart className="text-2xl" />
                    </button>
                  </div>
                )}
                {isLoggedIn && role === "admin" && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => navigate(`/update-book/${id}`)}
                      className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      <FiEdit2 className="text-2xl" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      <FaTrashCan className="text-2xl" />
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
