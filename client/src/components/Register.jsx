import React, { useState } from 'react'
import Axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState([])

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setErrors(['Passwords do not match'])
      return
    }

    Axios.post('http://localhost:8001/api/users/register', {username, email, passwordHash: password})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <h1>Register</h1>
      <form onSubmit={submitHandler} method="post" className='flex flex-col gap-4'>
        <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <div className='relative'>
          <input type={showPassword ? 'text' : 'password'} placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className='ml-2' onClick={handleToggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className='relative'>
          <input type={showConfirmPassword ? 'text' : 'password'} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
          <button className='ml-2' onClick={handleToggleShowConfirmPassword}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button className='p-2 rounded bg-gray-400 shadow text-white hover:bg-gray-500' type="submit">Submit</button>
      </form>
      {errors.map((err, index) => <p className='text-red-600' key={index}>{err}</p>)}
    </div>
  )
}

export default Register