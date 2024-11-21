import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8001/api/users/login', { username, passwordHash: password }, { withCredentials: true })
      .then(async res => {
        navigate('/dashboard');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        setErrors([err.response.data.message]);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={submitHandler} method="post" className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-teal-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-teal-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-700 text-white font-semibold rounded-md shadow hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Submit
          </button>
          {errors.length > 0 && (
            <div className="mt-4">
              {errors.map((err, index) => (
                <p className="text-red-600 text-sm" key={index}>{err}</p>
              ))}
            </div>
          )}
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/" className="text-teal-600 hover:text-teal-800">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;