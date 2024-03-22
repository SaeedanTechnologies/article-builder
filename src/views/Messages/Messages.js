import React from 'react'
import Page from '../../components/page'
import { StyledContainer, StyledRoot } from './styles'
import SideBar from './components/SideBar'
import Chat from './components/Chat'
const Messages = () => {
  return (
    <Page title="Messages">
        <StyledRoot>
            <StyledContainer>
            <SideBar />
            {/* <Chat /> */}
            </StyledContainer>
        </StyledRoot>
    </Page>
  )
}

export default Messages
