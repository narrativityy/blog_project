import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar = () => {

  const handleLogout = () => {
    Cookies.remove('userId')
    Cookies.remove('username')
    window.location.href = '/'
  }

  return (
    <div className='flex justify-between items-center mb-4'>
      <h3 className="text-xl font-bold"><Link to='/'>Blog</Link></h3>
      <div className='flex gap-4'>
        <h5 className="text-md"><Link to='/post/create'>Create Post</Link></h5>
        <h5 className="text-md"><Link to='/profile'>{Cookies.get('username')}</Link></h5>
        <h5 className="text-md cursor-pointer" onClick={handleLogout}>Logout</h5>
      </div>
    </div>
  )
}

export default Navbar