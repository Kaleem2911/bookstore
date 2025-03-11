import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
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
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('https://bookstore-zqy9.onrender.com/get-order-history', { headers });
        if (response.status === 200) {
          const groupedOrders = response.data.data.reduce((acc, order) => {
            const bookId = order.book._id;
            if (!acc[bookId]) {
              acc[bookId] = { ...order, quantity: 1 };
            } else {
              acc[bookId].quantity += 1;
            }
            return acc;
          }, {});

          setOrderHistory(Object.values(groupedOrders)); 
        }
      } catch (error) {
        console.error(error);
        showAlert('An error occurred while fetching order history.', 'error');
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      {orderHistory.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-700 text-2xl">You have no order history yet.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:space-x-4 ">
          <div className="flex-grow ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
              {orderHistory.map((order, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col border border-black">
                  <div className="flex justify-center items-center mt-5 aspect-w-3 aspect-h-4">
                    <img
                      src={order.book.file}
                      alt={order.book.title}
                      className="object-center h-24 w-20 rounded-md"
                    />
                  </div>
                  <div className="p-2 flex flex-col flex-grow">
                    <h2 className="text-md font-bold mb-1">{order.book.title}</h2>
                    <p className="text-gray-700 mb-1 text-sm"><b>Author:</b> {order.book.author}</p>
                    <p className="text-gray-700 mb-1 text-sm"><b>Price:</b> ₹{order.book.price}</p>
                    <p className="text-gray-700 mb-1 text-sm"><b>Quantity:</b> {order.quantity}</p>
                    <p className="text-gray-700 mb-1 text-sm"><b>Ordered on:</b> {new Date(order.date).toLocaleDateString()}</p>
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

export default OrderHistory;
