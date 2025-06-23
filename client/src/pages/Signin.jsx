import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signinStart, signinSuccess, signinFailure} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
  const [formData, setFormData] = useState({});
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);// instead of using these, we use the state from the redux store
  const {loading, error} = useSelector((state) => state.user);  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setLoading(true);// Here instead of setting loading to true, we dispatch the signinStart action
    dispatch(signinStart());

    // Validate form data
    if (!formData.email || !formData.password) {
      dispatch(signinFailure('Please fill in all fields'));
      return;
    }

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signinFailure(data.message || 'Something went wrong'));
        return;
      }

      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      dispatch(signinSuccess(data));
      // Success - redirect to home or dashboard
      console.log('Signin successful:', data);
      navigate('/'); // Redirect to home page

    } catch (err) {
      dispatch(signinFailure(err.message || 'Something went wrong'));
      console.error('Signin error:', err);
    } 
  };

  console.log(error);     
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Sign in</h1>
          <p className="text-sm text-gray-500">Welcome back, please sign in</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="my-6 border-t text-center relative">
          <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-400">
            OR ACCESS QUICKLY
          </span>
        </div>

          <OAuth />


        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
