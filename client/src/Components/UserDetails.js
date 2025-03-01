import React, { useRef, useState } from "react";
import { FaCamera, FaEdit } from "react-icons/fa";
import axios from "axios";

const UserDetails = ({ profileDetails }) => {
  const [avatar, setAvatar] = useState(profileDetails?.avatar || "default-avatar.jpg");
  const [address, setAddress] = useState(profileDetails?.address || "");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Hidden file input reference
  const fileInputRef = useRef(null);

  // Function to handle file upload
  const handleUploadImage = async (file) => {
    if (!file) return;
console.log(avatar);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.put(
        "https://bookstore-1-yy82.onrender.com/update-avatar",
        formData,
        { headers }
      );

      setAvatar(response.data.user.avatar);
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Failed to upload avatar. Please try again.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpdateAddress = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.put(
        "https://bookstore-1-yy82.onrender.com/update-address",
        { address },
        { headers }
      );

      alert("Address updated successfully!");
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

  // Safeguard against null profileDetails
  if (!profileDetails) {
    return <p>Loading profile details...</p>;
  }

  return (
    <div className="max-w-sm mx-auto bg-zinc-300 text-black rounded-lg overflow-hidden mt-8 mb-8 p-6 border border-black">
      <div className="flex flex-col items-center">
        {/* Avatar Image */}
        <div className="relative w-40 h-40">
          <img
            src={profileDetails.avatar}
            alt="Profile Avatar"
            className="rounded-full w-40 h-40 border-4 object-cover shadow-md"
          />
          <FaCamera
            className="absolute bottom-2 right-2 text-gray-700 bg-white rounded-full p-2 shadow-md w-8 h-8 cursor-pointer hover:bg-gray-200"
            onClick={triggerFileInput}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleUploadImage(e.target.files[0])}
          />
        </div>

        {/* User Details */}
        <h2 className="text-2xl font-bold mt-4">
          {profileDetails.username || "Anonymous User"}
        </h2>
        <p className="text-sm text-gray-500">
          {profileDetails.email || "Email not available"}
        </p>
      </div>

      {/* Additional Info */}
      <div className="mt-8 space-y-4 flex flex-col items-center justify-center">
        <div className="text-center bg-gray-100 p-4 rounded-lg shadow-inner w-full max-w-xs">
          <p className="text-sm">
            <strong>UserId:</strong> {profileDetails._id || "N/A"}
          </p>
        </div>
        <div className="text-center bg-gray-100 p-4 rounded-lg shadow-inner w-full max-w-xs relative">
          <p className="text-sm">
            <strong>Address:</strong> {profileDetails.address || "Not Provided"}
          </p>
          {isEditingAddress ? (
            <div className="flex flex-col items-center mt-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 border border-gray-400 rounded mb-2 w-full"
              />
              <button
                onClick={handleUpdateAddress}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          ) : (
            <FaEdit
              className="absolute bottom-2 right-2 text-gray-700 bg-white rounded-full p-2 shadow-md w-8 h-8 cursor-pointer hover:bg-gray-200"
              onClick={() => setIsEditingAddress(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
