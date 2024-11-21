import React from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <div className='flex justify-between items-center p-4'>
        <h3>Blog</h3>
        <h5><Link to='/profile'>{Cookies.get('username')}</Link></h5>
      </div>
    </div>
  )
}

export default Dashboard