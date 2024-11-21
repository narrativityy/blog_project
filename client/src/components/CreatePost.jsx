import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from './Navbar.jsx';

const CreatePost = () => {

  const navigate = useNavigate()

  const [post, setPost] = useState({
    title: '',
    body: '',
    userId: Cookies.get('userId')
  })

  const submitHandler = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:8001/api/posts', post, {withCredentials: true})
      .then(res => {
        navigate('/dashboard')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='p-4'>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a New Post</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter post title"
              value={post.title}
              onChange={(e) => setPost({...post, title: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter post content"
              value={post.body}
              onChange={(e) => setPost({...post, body: e.target.value})}
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;