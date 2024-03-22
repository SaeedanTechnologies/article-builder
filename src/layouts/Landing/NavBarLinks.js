import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom/dist'

const NavBarLinks = () => {
  return (
    <div>
      <Button variant='contained'
        component={Link}
        to='/home'
      > Home</Button>
      <Button variant='contained'
        component={Link}
        to='/auth/login'
      > Login</Button>
      <Button variant='contained'
        component={Link}
        to='auth/register'
      > SignUp</Button>
    </div>
  )
}

export default NavBarLinks
