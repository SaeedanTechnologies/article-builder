import React, { useState } from 'react';
import Page from '../../../../components/page';
import { Box, styled, Tab, Tabs, AppBar } from '@mui/material';
import ProfilePosts from '../../../../layouts/ProfilePage/components/ProfilePosts';
import ProfileProjects from '../../../../layouts/ProfilePage/components/ProfileProjects';

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  background: '#F0F2F5',
  minHeight: '100vh',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed', // Make the AppBar fixed
  top: 60,
  background: '#fff',
}));

const Feed = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Page title="Feeds">
      <StyledAppBar>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Posts" />
          <Tab label="Projects" />
        </Tabs>
      </StyledAppBar>
      <StyledRoot sx={{ paddingTop: '64px' }}>
        {tabValue === 0 && 
        <Box sx={{mt:10}}>
        <ProfilePosts />
        </Box>
        }
        {tabValue === 1 && <Box sx={{mt:10}}><ProfileProjects /></Box>}
      </StyledRoot>
    </Page>
  );
};

export default Feed;
