import React, { useState } from 'react'
import Axios from 'axios'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:8001/api/users', {username, email, passwordHash: password})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className=''>
      <h1>Login</h1>
      <form onSubmit={submitHandler} method="post">
        <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login