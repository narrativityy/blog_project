import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Axios from 'axios'

const Profile = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:8001/api/users/' + Cookies.get('userId'), {withCredentials: true})
      .then(res => {
        setUser(res.data)
        setLoaded(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    Axios.patch('http://localhost:8001/api/users/' + Cookies.get('userId'), user, {withCredentials: true})
      .then(res => {
        console.log(res)
        navigate('/dashboard')
      })
      .catch(err => {
        console.log(err)
        setErrors([err.response.data.message])
      })
  }

  return (
    loaded ? 
    <div className='flex justify-center items-center p-4 text-center gap-4'>
      <div className=''>
        <h3>My Profile</h3>
        <form className='' onSubmit={(e) => submitHandler(e)}>
          <table className='table-auto gap-2'>
            <tr>
              <td><label className='' htmlFor="username">Username: </label></td>
              <td><input className='mx-2 my-2' type="text" name="username" id="username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} /></td>
            </tr>

            <tr>
              <td><label className='my-2' htmlFor="email">Email: </label></td>
              <td><input className='my-2' type="text" name="email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} /></td>
            </tr>
            {user.bio ? 
            <tr>
              <td><label className='mx-4 my-2' htmlFor="bio">Bio: </label></td>
              <td><input className='mx-4 my-2' type="text" name="bio" id="bio" value={user.bio} onChange={(e) => setUser({...user, bio: e.target.value})} /></td>
            </tr> : null}
          </table>
          <button type="submit">Submit Changes</button>
        </form>
        {errors.map((err, index) => <p className='text-red-600' key={index}>{err}</p>)}
      </div>
    </div> : <p>loading</p> 
  )
}

export default Profile