import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Navbar from './Navbar.jsx';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:8001/api/posts', { withCredentials: true })
      .then(res => {
        setPosts(res.data);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const timeAgo = (date) => {
    const now = new Date();
    const updatedAtDate = new Date(date);
    const seconds = Math.floor((now - updatedAtDate) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };

  return (
    loaded ? (
      <div className="p-4">
        <Navbar />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-700">{post.body}</p>
              { post.user._id === Cookies.get('userId') ? <p className="text-sm text-gray-500">By you</p> : <p className="text-sm text-gray-500">By {post.user.username}</p> }
              <p className="text-sm text-gray-400">Last updated: {timeAgo(post.updatedAt)}</p>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  );
}

export default Dashboard;