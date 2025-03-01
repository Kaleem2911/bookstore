import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://bookstore-1-yy82.onrender.com/get-all-users", { headers });
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://bookstore-1-yy82.onrender.com/delete-user/${userId}`, { headers });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError("Failed to delete user. Please try again later.");
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow relative overflow-hidden"
          >
            <h2 className="text-lg font-bold text-gray-800">{user.username}</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Address:</span> {user.address || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Role:</span> {user.role || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">User ID:</span> {user._id}
            </p>
            <button
              onClick={() => handleDelete(user._id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
