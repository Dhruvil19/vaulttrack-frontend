import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      alert('Signup successful! Please check your email to verify your account.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed: ' + err.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your VaultTrack account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="relative block w-full appearance-none rounded-t-md border px-3 py-2 text-gray-900 placeholder-gray-500 sm:text-sm"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              className="relative block w-full appearance-none border px-3 py-2 text-gray-900 placeholder-gray-500 sm:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full appearance-none rounded-b-md border px-3 py-2 text-gray-900 placeholder-gray-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Sign up
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-500">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;