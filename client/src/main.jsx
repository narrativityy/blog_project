import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Dashboard from './components/Dashboard.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Cookies.get('userId') ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/login" element={Cookies.get('userId') ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path='/dashboard' element={Cookies.get('userId') ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)