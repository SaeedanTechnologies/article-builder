import React, { useState } from 'react';
import { AppBar, Container, CssBaseline, Toolbar, Typography, Paper, Grid, Box, Link, ImageList, ImageListItem, Button, Pagination, } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VerifiedIcon from '@mui/icons-material/Verified';
import LanguageIcon from '@mui/icons-material/Language';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import Page from '../../components/page';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from
  '@mui/lab';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ProfilePosts from './components/ProfilePosts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../store/actions/userActions';
import ProfileProjects from './components/ProfileProjects';
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  }
];
const content = [
  { label: "Posts", content: <ImageList sx={{ width: "100%", height: 450 }} cols={10} rowHeight={164}>...</ImageList> },
  { label: "4 Post", content: "Content for 4 Post" },
  { label: "2 Following", content: "Content for 2 Following" },
  { label: "3 Followers", content: "Content for 3 Followers" },
];
const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useSelector((state)=>state.admin.user)
  console.log(user)
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  // console.log(selectedTab)
  const tabLabels = ["Posts", "Project TimeLine", "4 Post", "2 Following", "3 Followers", "tags"];
  const dispatch = useDispatch()
 
 
  // Change page
 
  return (
    <Page title="Profile">
      <CssBaseline />

      <>
        {/* Black overlay at the top */}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            minHeight: '100vh',
            // zIndex: 1,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.9),rgba(255, 255, 255, 0.6)',
          }}

        >
        </div>

        <Container maxWidth="lg" style={{ position: 'relative', }}>
          <Box sx={{ marginTop: '150px', display: 'flex', color: 'white' }}>
            <Box>
              <img src="/assets/images/log.png" alt="Your Image" style={{ height: '200px', width: '200px' }} />
              <Button style={{ marginLeft: '40px', backgroundColor: 'Green', color: 'white', marginTop: '10px ' }}>Edit Profile</Button>
            </Box>
            <Box sx={{ marginTop: '30px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                  marginLeft: '25px',
                  justifyContent: 'start',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h3">{user.name}</Typography>
                <VerifiedIcon sx={{ color: 'blue', fontSize: '30px' }} />
              </Box>
              <Typography sx={{ marginLeft: '25px', marginTop: '6px' }}>bader m alsuliamani , archyit , makkah</Typography>
              <Box sx={{ marginLeft: '25px', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Link href="#" underline="none" sx={{ backgroundColor: 'white', color: 'black', padding: '3px 15px', borderRadius: '5px' }}>
                  <LanguageIcon /> {user.email}
                </Link>
                <AiFillGoogleCircle style={{ fontSize: '30px', color: 'red' }} />
                <FaFacebook style={{ fontSize: '30px', color: 'blue' }} />
                <AiFillTwitterCircle style={{ fontSize: '30px', color: 'lightblue' }} />
              </Box>
            </Box>
          </Box>
        </Container>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            sx={{ mb: 4 }}
          >
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} sx={{
                color: selectedTab === index ? 'blue' : 'white',
                fontSize: '17px',
                fontWeight: 'bold'
              }} />
            ))}
          </Tabs>

          {selectedTab === 0 && <Box>
            <ProfilePosts />
          </Box>}
          {selectedTab === 1 && <div>
            {/* <Timeline position="alternate-reverse" sx={{ color: "Green" }}>
              <TimelineItem>
                <TimelineSeparator>
                  <ArrowCircleLeftRoundedIcon />
                  <TimelineConnector sx={{ backgroundColor: 'black' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ fontSize: '20px' }}>2022 | Title</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <ArrowCircleRightRoundedIcon />
                  <TimelineConnector sx={{ backgroundColor: 'black' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ fontSize: '20px' }}>2023 | Title</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <ArrowCircleLeftRoundedIcon />
                  <TimelineConnector sx={{ backgroundColor: 'black' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ fontSize: '20px' }}>2021 | Title</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator >
                  <ArrowCircleRightRoundedIcon />
                </TimelineSeparator>
                <TimelineContent sx={{ fontSize: '20px' }}>2020 | Title</TimelineContent>
              </TimelineItem>
            </Timeline> */}
            <ProfileProjects />
          </div>}
          {selectedTab === 2 && <div>
            <ImageList sx={{ width: "100%", paddingX: '25px' }} cols={10} rowHeight={164}>
              {itemData.map((item) => (
                <ImageListItem key={item.img} sx={{ height: '220px', width: '220px' }}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList></div>}
          {selectedTab === 3 && <div>
            <ImageList sx={{ width: "100%" }} cols={10} rowHeight={164}>
              {itemData.map((item) => (
                <ImageListItem key={item.img} sx={{ height: '220px', width: '220px' }}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList></div>}
          {selectedTab === 4 && <div>
            <ImageList sx={{ width: "100%", paddingX: '22px' }} cols={10} rowHeight={164}>
              {itemData.map((item) => (
                <ImageListItem key={item.img} sx={{ height: '220px', width: '220px' }}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList></div>}
          {selectedTab === 5 && <div>
            This is Tag section
          </div>}
        </Box>


      </>
    </Page>
  );
};

export default ProfilePage;
