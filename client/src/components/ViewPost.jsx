import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Post from './Post.jsx'; // Ensure this path is correct based on your file structure

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:8001/api/posts/${id}`, { withCredentials: true })
      .then(res => {
        setPost(res.data);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  return (
    loaded ? (
      post ? (
        <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
          <Post post={post} isDashboard={false} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg">Post not found</div>
        </div>
      )
    ) : (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  );
};

export default ViewPost;