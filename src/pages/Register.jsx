import React from 'react'

const Register =()=> {
  return(
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to get started
          </p>
        </div>

        {/* Form */}
        <form
          action="http://localhost:8001/api/v1/users/register"
          method="POST"
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold
                       rounded-lg hover:bg-indigo-700
                       active:scale-[0.98] transition"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a
            href="/api/v1/users/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register