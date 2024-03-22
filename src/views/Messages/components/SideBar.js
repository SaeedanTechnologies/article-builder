import React from 'react'
import { StyledSideBar } from '../styles'
import NavBar from './NavBar'
import Chat from './Chat'
import UserList from './UserList'

const SideBar = () => {
  return (
    <StyledSideBar>
        <NavBar />
        <UserList />
    </StyledSideBar>
  )
}

export default SideBar
