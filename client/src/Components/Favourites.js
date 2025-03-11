import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

const Favourites = () => {
  const [favouriteBook, setFavouriteBook] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  
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
    axios.get('https://bookstore-zqy9.onrender.com/get-favourite-books', { headers })
      .then((res) => {
        setFavouriteBook(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleRemove = async (bookid, event) => {
    event.stopPropagation();
    try {
      const response = await axios.delete(
        'https://bookstore-zqy9.onrender.com/remove-book-from-favourites',
        {
          headers: {
            ...headers,
            bookid,
          },
        }
      );
      if (response.status === 200) {
        showAlert('Book removed from favourites', 'success');
        setFavouriteBook(favouriteBook.filter((book) => book._id !== bookid));
      } else {
        showAlert('Failed to remove book from favourites', 'error');
      }
    } catch (error) {
      showAlert('Failed to remove book from favourites', 'error');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      {favouriteBook.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-700 text-2xl">You have no favourite books yet.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {favouriteBook.map((book, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col border border-black"
                  onClick={() => navigate(`/get-books/${book._id}`)}
                >
                  <div className="flex justify-center items-center mt-5 relative">
                    <img
                      src={book.file}
                      alt={book.title}
                      className="object-center h-40 w-32 rounded-md"
                    />
                    <button
                      className="absolute top-2 right-2 text-black hover:text-gray-500"
                      onClick={(event) => handleRemove(book._id, event)} // Pass event to handleRemove
                    >
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="p-2 flex flex-col flex-grow">
                    <h2 className="text-md font-bold mb-1">{book.title}</h2>
                    <p className="text-gray-700 mb-1"><b>Author:</b> {book.author}</p>
                    <p className="text-gray-700 mb-1 line-clamp-2"><b>Description:</b> {book.desc}</p>
                    <p className="text-gray-700 mb-1"><b>Language:</b> {book.language}</p>
                    <p className="text-green-600 font-bold text-sm"><b>Price:</b> ₹{book.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
