import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../toast';
import 'react-toastify/dist/ReactToastify.css';
import { signupService } from '../services/service';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.name && formData.email && formData.password) {
        const result = await signupService(
          formData.name,
          formData.email,
          formData.password
        );
        const { message, error, success } = result;
        if (error) {
          handleError(error);
        } else if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        } else if (!success) {
          handleError(message);
        }
      } else {
        handleError('Please fill all the signup details');
      }
    } catch (error) {
      console.log(error);
      handleError('Error while Submitting Data');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-green-100">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Create Account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Join SaveMyFood and start reducing food waste
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <span
              className="text-green-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
