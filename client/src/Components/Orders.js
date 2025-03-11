import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBook, FaUser, FaCalendarAlt, FaTrashAlt } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:5000/get-all-orders", { headers });
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`https://localhost:5000/delete-order/${orderId}`, { headers });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      setError("Failed to delete order. Please try again later.");
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      {orders.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-700 text-2xl">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 break-words">Order ID: {order._id}</h2>
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaBook className="mr-2 text-gray-600" /> <b>Book:</b> {order.book?.title || "N/A"}
                </p>
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaUser className="mr-2 text-gray-600" /> <b>User:</b> {order.user?.username || "N/A"}
                </p>
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-600" /> <b>Ordered on:</b> {new Date(order.date).toLocaleDateString()}
                </p>
                <button onClick={() => handleDelete(order._id)} className="mt-4 text-red-500 hover:text-red-700 flex items-center">
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
