import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://bookstore-zqy9.onrender.com/singup', {
        username,
        email,
        password,
        address,
      }, {
        withCredentials: true
      });
      navigate('/login');
      console.log("Submitting:", { username, email, password, address });
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md p-6 border border-black rounded-2xl bg-white shadow-lg m-4 sm:m-8">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-6 font-medium">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-base text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
