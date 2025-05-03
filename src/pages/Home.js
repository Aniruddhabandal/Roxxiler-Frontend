import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Home = () => {
  const { user } = useAuth(); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Store Rating App</h1>

      {user ? (
        <div className="space-y-4 text-center">
          <p className="text-lg">Hello, <strong>{user.name}</strong>! You are logged in as <strong>{user.role}</strong>.</p>

          {user.role === 'admin' && (
            <Link to="/admin/dashboard" className="text-blue-600 underline">Go to Admin Dashboard</Link>
          )}

          {user.role === 'user' && (
            <Link to="/stores" className="text-blue-600 underline">Browse & Rate Stores</Link>
          )}

          {user.role === 'storeOwner' && (
            <Link to="/store/dashboard" className="text-blue-600 underline">View Store Ratings</Link>
          )}
        </div>
      ) : (
        <div className="space-x-4 btn-group">
          <Link to="/login" className="btn btn-outline-primary">Login</Link>
          <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
