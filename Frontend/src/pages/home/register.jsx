import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);

    try {
      const response = await fetch('http://127.0.0.1:8000/register_new_user', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        setMessage('User registered successfully');
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000); // Redirect to guidelines page after 5 seconds
      } else {
        setMessage('Failed to register user');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Register New User</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={text} onChange={handleTextChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <button type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${isSuccess ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}>
            Register
          </button>
          {message && <p className={`text-center mt-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
