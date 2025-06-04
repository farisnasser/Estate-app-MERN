// import React from 'react'

// function SignUp() {
//   return (
//     <div>
//       <h1 className='text-3xl font-bold text-center'>Sign Up</h1>
//       <form className='flex flex-col gap-4'>
//         <input type="text" placeholder='username' className='border-2 border-gray-300 rounded-md p-2' />
//         <input type="email" placeholder='email' className='border-2 border-gray-300 rounded-md p-2' />
//         <input type="password" placeholder='password' className='border-2 border-gray-300 rounded-md p-2' />
//         <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Sign Up</button>
//       </form>
//     </div>
//   )
// }

// export default SignUp

import React from 'react';

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Sign up</h1>
          <p className="text-sm text-gray-500">Sign up to continue</p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            Sign up
          </button>
        </form>

        <div className="my-6 border-t text-center relative">
          <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-400">
            OR ACCESS QUICKLY
          </span>
        </div>

        <div className="flex gap-4">
          <button className="w-full border border-gray-300 p-3 rounded-md text-sm hover:bg-gray-100">
            Google
          </button>
          <button className="w-full border border-gray-300 p-3 rounded-md text-sm hover:bg-gray-100">
            LinkedIn
          </button>
          <button className="w-full border border-gray-300 p-3 rounded-md text-sm hover:bg-gray-100">
            SSO
          </button>
        </div>

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
