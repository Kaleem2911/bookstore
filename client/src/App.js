import React, { useEffect } from 'react';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import AllBooks from './Components/AllBooks';
import Login from './Components/Login';
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/SignUp';
import BookDetail from './Components/BookDetail';
import Profile from './Components/Profile';
import Cart from './Components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store/Auth';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Admin from './Components/Admin';
import AddBook from './Components/AddBook';
import UpdateBook from './Components/UpdateBook';



const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (
      localStorage.getItem('id') &&
      localStorage.getItem('role') &&
      localStorage.getItem('token')
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-white to-blue-50">
      {isLoggedIn === true && role === "admin" ? <Admin/> : <Header/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AllBooks" element={<AllBooks />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/get-books/:id" element={<BookDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/AddBook" element={<AddBook/>} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
