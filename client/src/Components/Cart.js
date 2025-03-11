import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Alert from './Alert';

const Cart = () => {
  const [cartBooks, setCartBooks] = useState([]);
  const [alert, setAlert] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  useEffect(() => {
    axios.get('https://bookstore-zqy9.onrender.com/get-cart-books', { headers })
      .then((res) => {
        const booksWithQuantity = res.data.data.map(book => ({
          ...book,
          quantity: book.quantity || 1, // Ensure every book has a quantity
        }));
        setCartBooks(booksWithQuantity);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleRemove = async (bookid) => {
    try {
      const response = await axios.delete(
        'https://bookstore-zqy9.onrender.com/removeBookFromCart',
        {
          headers: {
            ...headers,
            bookid,
          },
        });
      if (response.status === 200) {
        showAlert('Book removed from Cart', 'success');
        setCartBooks(cartBooks.filter((book) => book._id !== bookid));
      } else {
        showAlert('Error removing book from cart', 'error');
      }
    } catch (error) {
      showAlert('Error removing book from cart:', error.message);
    }
  };

  const handleQuantityChange = (bookid, change) => {
    setCartBooks(prevCartBooks =>
      prevCartBooks.map(book =>
        book._id === bookid
          ? { ...book, quantity: Math.max(1, book.quantity + change) }
          : book
      )
    );
  };

  const totalBooks = cartBooks.reduce((total, book) => total + book.quantity, 0);
  const totalPrice = cartBooks.reduce((total, book) => total + Number(book.price) * book.quantity, 0);

  const handleOrderHistory = async () => {
    try {
      if (cartBooks.length === 0) {
        showAlert('Your cart is empty. Add books to place an order!', 'error');
        return;
      }

      const response = await axios.post(
        'https://bookstore-zqy9.onrender.com/place-order',
        { order: cartBooks },
        { headers }
      );

      if (response.data.status === "Success") {
        showAlert('Order placed successfully!', 'success');
        setCartBooks([]);
      } else {
        showAlert(response.data.message || 'Failed to place the order.', 'error');
      }
    } catch (error) {
      console.error(error);
      showAlert('An error occurred while placing the order.', 'error');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      {cartBooks.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-700 text-2xl">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {cartBooks.map((book, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                  <div className='flex justify-center items-center mt-5 relative'>
                    <img
                      src={book.file}
                      alt={book.title}
                      className="object-center h-36 w-28 rounded-md"
                    />
                    <button className="absolute top-2 right-2 text-black hover:text-gray-500" onClick={() => handleRemove(book._id)}>
                        <RxCross2 className='text-xl' />
                    </button>
                  </div>
                  <div className="p-2 flex flex-col flex-grow">
                    <h2 className="text-lg font-bold mb-1">{book.title}</h2>
                    <p className="text-gray-700 mb-1"><b>Author:</b> {book.author}</p>
                    <p className="text-gray-700 mb-1"><b>Language:</b> {book.language}</p>
                    <p className="text-green-600 font-bold text-md"><b>Price:</b> ₹{book.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/4 h-72 bg-white rounded-lg shadow-lg p-6 mt-6 lg:mt-0 lg:sticky top-16">
            <h3 className="text-2xl font-semibold mb-6 text-center border-b-2 border-gray-200 pb-3">
              Cart Summary
            </h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-700">Total Books:</span>
              <span className="text-lg font-semibold">{totalBooks}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-gray-700">Total Price:</span>
              <span className="text-lg font-bold text-green-600">₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-blue-600 text-white text-lg font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={handleOrderHistory}
            >
              Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
