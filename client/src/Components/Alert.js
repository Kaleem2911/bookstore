import React, {  useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000); 
    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg flex items-center space-x-4 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <div>
        {type === 'success' ? (
          <FaCheckCircle className="text-2xl" />
        ) : (
          <FaExclamationCircle className="text-2xl" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      <button className="text-2xl" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
