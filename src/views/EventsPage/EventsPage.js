import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { StyledRoot } from "./styles";
import Page from "../../components/page";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Content from "./components/Content";
import Bottom from "./components/Bottom";
import EventTabs from "./components/EventsTabs";

const EventsPage = () => {
  const [elevation, setElevation] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 0) {
        setElevation(4);
      } else {
        setElevation(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts.
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Page title="Events">
      {/* <StyledRoot> */}
      {/* <AppBar sx={{ background: 'transparent', boxShadow: elevation === 0 ? 'none' : '', paddingLeft:10, paddingRight:10, pt:2 }}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography>
                Events Page
            </Typography>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <Button sx={{textTransform:'none', mr:2, color:'#fff', fontWeight:'bold'}}>
                    About
                </Button>
                <Button sx={{textTransform:'none', mr:2, color:'#fff', fontWeight:'bold'}}>
                    Events
                </Button>
                <Button sx={{textTransform:'none', mr:2, color:'#fff', fontWeight:'bold'}}>
                    Speakers
                </Button>
                <Button sx={{textTransform:'none', mr:2, color:'#fff', fontWeight:'bold'}}>
                    News
                </Button>
                <Button sx={{textTransform:'none', mr:2, color:'#fff', fontWeight:'bold'}}>
                    Contact
                </Button>
            </Box>
            <Box>
                <IconButton>
                    <SearchIcon sx={{color:'#fff',}} />
                </IconButton>
                <Button 
                startIcon={
                    <DateRangeIcon />
                }
                variant='outlined' sx={{
                    color:'#fff',
                    borderColor:'#fff',
                    borderRadius:10,
                    '&:hover': {
                    borderColor:'#fff',
                    background:'#fff',
                    color:'#000'
                    }
                }}>
                   <span style={{fontSize:20, marginRight:5}}>|</span> 
                   Book Now
                </Button>
            </Box>
        </Toolbar>
      </AppBar> */}
      {/* <Content /> */}
      {/* </StyledRoot> */}
      <EventTabs />
    </Page>
  );
};

export default EventsPage;
