import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user.role === 'admin' && stats ? (
        <div>
          <p>Total Users: {stats.users}</p>
          <p>Total Stores: {stats.stores}</p>
          <p>Total Ratings: {stats.ratings}</p>
        </div>
      ) : (
        <p>Access denied: Admin only</p>
      )}
    </div>
  );
};

export default Dashboard;
