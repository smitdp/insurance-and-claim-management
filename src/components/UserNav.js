import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="policies">Policies</Link>
        <Link to="my-policies">My Policies</Link>
    </div>
  )
}

export default UserNav