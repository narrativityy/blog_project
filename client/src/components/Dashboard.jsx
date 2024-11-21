import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from './Navbar.jsx';
import Post from './Post.jsx';
import Loading from './Loading.jsx';

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

  return (
    loaded ? (
      <div className="bg-gray-100 p-4 min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto">
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <Post key={index} post={post} index={index} isDashboard={true} />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    )
  );
}

export default Dashboard;