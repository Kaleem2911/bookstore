import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import bgImage from "../assests/images/bg-image-1.png";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  useEffect(() => {
    // Fetch all books
    axios.get("https://bookstore-zqy9.onrender.com/get-books").then((res) => {
      setBooks(res.data.book);
    });

    // Fetch favorite books
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios.get("https://bookstore-zqy9.onrender.com/get-favourite-books", { headers })
      .then((res) => {
        setFavouriteBooks(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-r from-purple-50 via-white to-blue-50">
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full">
        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-playfair text-gray-900 leading-tight">
            Discover Your Next <span className="text-blue-600">Great Read</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mt-4 text-gray-700 font-lato leading-relaxed max-w-lg">
            Uncover <span className="font-semibold text-gray-900">captivating stories</span>,{" "}
            <span className="font-semibold text-blue-600">enriching knowledge</span>, and{" "}
            <span className="font-semibold text-gray-900">endless inspiration</span> in our curated collection of books.{" "}
            Let us guide you to your next <span className="text-blue-600 font-bold">great adventure</span>.
          </p>

          <Link to="/AllBooks">
            <button className="bg-gradient-to-r from-slate-500 to-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full mt-8 hover:bg-slate-600 transition-transform duration-300 shadow-lg border border-black">
              Discover Books
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div
          className="w-full lg:w-1/2 h-64 lg:h-96 bg-cover bg-center rounded-xl shadow-lg transition-transform transform hover:scale-105 overflow-hidden border border-slate-800"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Motivation Section */}
      <div className="w-full mt-24 text-center flex justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border border-black bg-blue-200 rounded-2xl w-1/2">
          "A Book a Day Keeps Reality Away"
        </h2>
      </div>

      {/* Book Slider */}
      <div className="w-full mt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Featured Books</h2>
  <Swiper
    spaceBetween={20}
    slidesPerView={1} 
    navigation
    autoplay={{ delay: 2500 }}
    modules={[Navigation, Pagination, Autoplay]}
    breakpoints={{
      640: { slidesPerView: 1 }, 
      768: { slidesPerView: 2 }, 
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 }, 
    }}
  >
    {books.map((book) => (
      <SwiperSlide key={book._id} className="p-2">
        <div className="border border-black shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 ">
          <Link to={`/get-books/${book._id}`}>
            <div className="p-3 flex flex-col items-center">
              <img
                alt={book.title}
                src={book.file}
                className="aspect-square w-24 h-32 object-cover transform transition-transform duration-300 hover:scale-105 rounded"
              />
              <h3 className="mt-2 text-md text-gray-800 font-semibold text-center">{book.title}</h3>
              <p className="mt-1 text-xs text-gray-600">
                <b>Author:</b> {book.author}
              </p>
              <p className="mt-1 text-sm font-medium text-blue-600">₹{book.price}</p>
            </div>
          </Link>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


      {/* Favorites Slider */}
      {favouriteBooks.length > 0 && (
  <div className="w-full mt-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Favorite Books</h2>
    <Swiper
      spaceBetween={20}
      slidesPerView={1} 
      navigation
      autoplay={{ delay: 2500 }}
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={{
        640: { slidesPerView: 1 }, 
        768: { slidesPerView: 2 }, 
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {favouriteBooks.map((book) => (
        <SwiperSlide key={book._id} className="p-2">
          <div className="border border-black shadow-lg rounded-full bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 w-56 h-56 flex justify-center items-center p-2">
            <Link to={`/get-books/${book._id}`}>
              <div className="flex flex-col items-center text-center">
                <img
                  alt={book.title}
                  src={book.file}
                  className="w-20 h-24 object-cover rounded mb-2" 
                />
                <h3 className="text-md text-gray-800 font-semibold">{book.title}</h3>
                <p className="text-xs text-gray-600">
                  <b>Author:</b> {book.author}
                </p>
                <p className="text-sm font-medium text-blue-600">₹{book.price}</p>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}


      {/* Return Policy Section */}
      <div className="w-full mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Return Policy</h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
          We want you to be completely satisfied with your purchase. If you are not, you can return or exchange your book within <span className="font-semibold text-gray-900">30 days</span> of purchase. Please ensure the book is in its original condition.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
