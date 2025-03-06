import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  useEffect(() => {
    axios.get("https://bookstore-zqy9.onrender.com/get-books").then((res) => {
      setBooks(res.data.book);
      setFilteredBooks(res.data.book);
    });
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredBooks(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      )
    );
    setCurrentPage(1);
  }, [searchQuery, books]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-white to-blue-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center font-lato tracking-wide leading-tight">
          Explore <em className="not-italic underline decoration-dotted">Our Collection</em> of Books
        </h1>
        <div className="relative mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[80%] p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {currentBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8">
            {currentBooks.map((product) => (
              <div
                key={product._id}
                className="shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-black"
              >
                <Link to={`/get-books/${product._id}`}>
                  <div className="p-5 flex flex-col items-center">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        alt={product.title}
                        src={product.file}
                        className="aspect-square w-full object-cover transform transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-3 text-lg text-gray-800 font-semibold text-center">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      <b>Author:</b> {product.author}
                    </p>
                    <p className="mt-1 text-base font-medium text-blue-600">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-700 mt-12">
            No books match your search. Try again with a different query!
          </p>
        )}
        {filteredBooks.length > booksPerPage && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex -space-x-px">
              {[...Array(Math.ceil(filteredBooks.length / booksPerPage))].map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-500 hover:bg-blue-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
