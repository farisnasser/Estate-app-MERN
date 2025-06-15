import React, { useState } from 'react';
import OAuth from '../components/OAuth';

function SignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit =  async(e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validate form data
    if (!formData.username || !formData.email || !formData.password) {
      setTimeout(() => {
        setError('Please fill in all fields');
        setLoading(false);
      }, 500); // Small delay to show loading state
      return;
    }
    
    // Additional validation
    if (formData.username.trim().length < 2) {
      setTimeout(() => {
        setError('Username must be at least 2 characters long');
        setLoading(false);
      }, 500);
      return;
    }
    
    if (formData.password.length < 6) {
      setTimeout(() => {
        setError('Password must be at least 6 characters long');
        setLoading(false);
      }, 500);
      return;
    }
    
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }
      
      // Success - show success state
      console.log('Signup successful:', data);
      setSuccess(true);
      
      // Auto redirect to sign-in after 3 seconds
      setTimeout(() => {
        window.location.href = '/sign-in';
      }, 3000);
      
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Show success page
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
          <div className="mb-6">
            {/* Success icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Created Successfully!</h1>
            <p className="text-gray-600 mb-4">Welcome to our platform. You can now sign in with your credentials.</p>
            <p className="text-sm text-gray-500">Redirecting to sign in page in 3 seconds...</p>
          </div>
          
          <a 
            href="/sign-in" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Sign up</h1>
          <p className="text-sm text-gray-500">Sign up to continue</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            onChange={handleChange}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign up'}
          </button>
        </form>

        <div className="my-6 border-t text-center relative">
          <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-400">
            OR ACCESS QUICKLY
          </span>
        </div>

        <OAuth/>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/sign-in" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
