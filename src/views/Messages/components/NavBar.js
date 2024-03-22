import { AppBar, Avatar, Box, Toolbar, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {
    const theme= useTheme()
    const user = useSelector((state)=>state.admin.user)
  return (
    <div>
      <AppBar position='static' sx={{background:theme.palette.secondary.main}}>
        <Toolbar>
                <Avatar sx={{height:'30px', width:'30px', background:'#e2e2e2'}} 
                src="/assets/images/user.png" />
            <Typography sx={{ml:2}}>
                {user.name}
            </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
