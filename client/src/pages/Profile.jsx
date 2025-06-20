import React from 'react';
import { useSelector } from 'react-redux';
export default function Profile() {

  const {currentUser} = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center">
          <img
            className="h-28 w-28 rounded-full object-cover border-4 border-indigo-600 shadow-md"
            src={currentUser.avatar}
            alt="Profile"
          />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Profile Settings</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account information
          </p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
          {/* Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="yourusername"
                className="mt-2 block w-full px-4 py-3 text-base rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 block w-full px-4 py-3 text-base rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 block w-full px-4 py-3 text-base rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Additional actions */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              Delete Account
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
