import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import CreatePost from './components/CreatePost.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Cookies.get('userId') ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/login" element={Cookies.get('userId') ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path='/dashboard' element={Cookies.get('userId') ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path='/profile' element={Cookies.get('userId') ? <Profile /> : <Navigate to="/login" />} />
        <Route path='/post/create' element={Cookies.get('userId') ? <CreatePost /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)