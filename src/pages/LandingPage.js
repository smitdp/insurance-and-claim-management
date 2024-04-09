import React from 'react'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    const handleLogin = () => {
        
    }
  return (
    <div>
        <Link to="/login">Login</Link> 
        <Link to="/register">Register</Link> 
    </div>
  )
}

export default LandingPage