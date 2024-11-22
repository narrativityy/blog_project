import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import Axios from 'axios';

const Post = ({ post, index, isDashboard }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);

  useEffect(() => {
    if (post.likes.includes(Cookies.get('username'))) {
      setIsLiked(true);
    }
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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

  const handleLike = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:8001/api/posts/like', { postId: post._id, username: Cookies.get('username') }, { withCredentials: true })
      .then(res => {
        setIsLiked(!isLiked)
        isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const isLongText = post.body.length > 100;
  const displayedText = isLongText ? isExpanded ? post.body : `${post.body.substring(0, 100)}...` : post.body;

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 ${isExpanded && !isDashboard ? 'm-8' : null}`}>
      { isDashboard ? <h3 className="text-lg font-semibold text-teal-700"><Link to={`/post/${post._id}`}>{post.title}</Link></h3> : <h3 className="text-lg font-semibold text-teal-700">{post.title}</h3> }
      <p className="text-gray-700 mt-2">{displayedText}</p>
      {isLongText && (
        <button
          onClick={toggleExpanded}
          className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
      {post.user._id === Cookies.get('userId') ? (
        <p className="text-sm text-gray-500 mt-2">By you</p>
      ) : (
        <p className="text-sm text-gray-500 mt-2">By {post.user.username}</p>
      )}
      <p className="text-sm text-gray-400 mt-1">Posted {timeAgo(post.createdAt)}</p>
      <div className='flex justify-between items-center'>
        <form onSubmit={handleLike}>
          <input type="hidden" name="postId" value={post._id} />
          <input type="hidden" name="username" value={Cookies.get('username')} />

          <button type="submit">{ isLiked ? <FaThumbsUp className='mt-4 text-3xl text-teal-700' /> : <FaRegThumbsUp className='mt-4 text-3xl text-teal-700' /> }</button>
        </form>

        <p className="text-sm text-gray-400 mt-3">{likes} likes</p>
      </div>
    </div>
  );
};

export default Post;