import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Navbar = () => {

  const navigate = useNavigate()

  const logoutHandler = () => {
    Axios.post('http://localhost:8001/api/users/logout', {}, {withCredentials: true})
      .then(res => {
        navigate('/')
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
    }

  return (
    <div className='flex justify-between items-center mb-4'>
      <h3 className="text-xl font-bold transition-transform duration-300 hover:scale-105"><Link to='/'>Blog</Link></h3>
      <div className='flex gap-4'>
        <h5 className="text-md transition-transform duration-300 hover:scale-105"><Link to='/post/create'>Create Post</Link></h5>
        <h5 className="text-md transition-transform duration-300 hover:scale-105"><Link to='/profile'>{Cookies.get('username')}</Link></h5>
        <h5 className="text-md cursor-pointer transition-transform duration-300 hover:scale-105" onClick={logoutHandler}>Logout</h5>
      </div>
    </div>
  )
}

export default Navbar