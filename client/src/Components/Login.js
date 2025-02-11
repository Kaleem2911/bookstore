import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../Store/Auth';
import { useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      dispatch(authActions.login());
      dispatch(authActions.changeRole(res.data.role));
      localStorage.setItem('id', res.data.id);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-sm p-6 rounded-2xl border border-black bg-white shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-black font-playfair">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-6 font-medium">{error}</p>}
        <p className="mt-6 text-center text-base text-gray-600">
          Don't have an account?{' '}
          <h1 className='text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300 flex justify-center' onClick={() => navigate(`/SignUp`)}>Sign up</h1>
        </p>
        <p className='text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300 flex justify-center'>
          <Link to='/forgot-password'>Forget Password</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
