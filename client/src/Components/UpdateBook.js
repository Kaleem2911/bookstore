import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateBook = () => {
  const { id } = useParams(); // Get book ID from URL params
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
    file: null, // For file uploads
  });
  const [alert, setAlert] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://bookstore-zqy9.onrender.com/get-book/${id}`);
        setBook(response.data.book);
        setFormData({
          title: response.data.book.title,
          author: response.data.book.author,
          price: response.data.book.price,
          desc: response.data.book.desc,
          language: response.data.book.language,
          file: null, // Existing file not included in initial form
        });
      } catch (error) {
        console.error('Error fetching book details:', error);
        setAlert({ message: 'Failed to fetch book details.', type: 'error' });
      }
    };
    fetchBook();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('desc', formData.desc);
    formDataToSend.append('language', formData.language);
    if (formData.file) {
      formDataToSend.append('file', formData.file); // Append file if updated
    }

    try {
      const response = await axios.put(
        `https://bookstore-zqy9.onrender.com/update-books/${id}`,
        formDataToSend,
        {
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setAlert({ message: response.data.message, type: 'success' });
      setTimeout(() => navigate('/AllBooks'), 1500); // Redirect after success
    } catch (error) {
      console.error('Error updating book:', error);
      setAlert({ message: 'Failed to update book. Please try again.', type: 'error' });
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
  <div className="max-w-xl mx-auto m-10 p-6 bg-slate-200 rounded shadow-lg">
  <h1 className="text-2xl font-bold mb-4">Update Book</h1>
  {alert && (
    <div
      className={`p-4 mb-4 text-white ${
        alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } rounded`}
    >
      {alert.message}
    </div>
  )}
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="col-span-1">
      <label className="block font-semibold">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="col-span-1">
      <label className="block font-semibold">Author</label>
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="col-span-1">
      <label className="block font-semibold">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="col-span-1">
      <label className="block font-semibold">Language</label>
      <input
        type="text"
        name="language"
        value={formData.language}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="col-span-2">
      <label className="block font-semibold">Description</label>
      <textarea
        name="desc"
        value={formData.desc}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="col-span-2">
      <label className="block font-semibold">Upload File</label>
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="col-span-2">
      <button
        type="submit"
        className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Update Book
      </button>
    </div>
  </form>
</div>

  );
};

export default UpdateBook;
