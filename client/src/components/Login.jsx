import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Login = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:8001/api/users/login', {username, passwordHash: password}, {withCredentials: true})
      .then(async res => {
        navigate('/dashboard')
      })
      .catch(err => {
        console.log(err)
        setErrors([err.response.data.message])
      }) 
  }

  return (
    <div className=''>
      <h1>Login</h1>
      <form onSubmit={submitHandler} method="post">
        <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
        {errors.map((err, index) => <p className='text-red-600' key={index}>{err}</p>)}
      </form>
    </div>
  )
}

export default Login