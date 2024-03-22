import React from 'react'
import Page from '../../components/page'
import { makeStyles } from '@mui/styles'
import { AppBar, Toolbar  ,Typography, Box, Divider, Button, styled, IconButton } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BottomPage from './components/BottomPage';
const StyledButton = styled(Button)(({theme})=> ({
    marginTop:theme.spacing(5),
    height:'60px',
    width:'170px',
    color:'#000',
    fontSize:'1.15rem',
    '&:hover': {
      boxShadow: '0px 0px 8px 2px rgba(255, 255, 255, 0.2)',
      background:'#e2e2e2'
    },
  }))
const useStyles = makeStyles((theme) => ({
    root:{
      minHeight:'70vh'
    },
    homepage: {
      backgroundImage: 'url("/assets/images/arch.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      color: 'white',
      position: 'relative',
    },
    blurOverlay: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      backdropFilter: 'blur(5px)', 
    },
    
}))
const CompetetionPage = () => {
    const classes = useStyles()
  return (
    <Page
    title="Competition"
    >
       <div className={classes.homepage}>
  <div className={classes.blurOverlay}>
    <AppBar sx={{background:'transparent'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography>
                Competetion Page
            </Typography>
            <Box sx={{display:'flex',alignItems:'center'}}>
            <Button variant='outlined' size='small' sx={{textTransform:'none', color:'#fff',mr:2,
             borderColor:'#fff', '&:hover':{borderColor:'#e2e2e2'}, height:'35px'}}>
                Download Brief
            </Button>
            <Button variant='outlined' size='small' sx={{textTransform:'none', color:'#fff',mr:2,
             borderColor:'#fff', '&:hover':{borderColor:'#e2e2e2'}, height:'35px'}}>
                Press Kit
            </Button>
            <IconButton>
                <EmailIcon sx={{color:'#fff', fontSize:'35px', mr:2}}/>
            </IconButton>
            <Box sx={{mt:-1}}>
            <span style={{fontSize:'1.5rem',}}> | </span>
            </Box>
            <Box sx={{display:'flex', alignItems:'center', ml:2}}>
                <Typography sx={{ml:1}}> EN </Typography>
                <IconButton>
                    <ArrowDropDownIcon sx={{color:'#fff', ml:-1}} />
                </IconButton>
            </Box>
            </Box>
        </Toolbar>
    </AppBar>
    <Box sx={{width:'40vw', mt:13, ml:13}}>
        <Box sx={{height:'50px', width:'50px', background:'#fff'}}>
            <img src="/assets/images/log.png"/>
        </Box>
    <Typography variant='h6' sx={{mt:1, letterSpacing:-1}}>
    ANUAL INTERNATIONAL DESIGN COMPETETION
  </Typography>
  <Typography variant="h2" fontWeight="bold">THE ARCHITECT'S CHAIR</Typography>
  <Typography variant='h5' sx={{mt:1}}>
    Edition #1
  </Typography>
  <Box sx={{mt:3, display:'flex'}}>
    <Box sx={{display:'flex'}}>
        <Box>
            <MilitaryTechIcon sx={{fontSize:'4rem'}} />
        </Box>
        <Box>
            <Typography sx={{fontSize:'12px', ml:0.25}}>
                PRIZE FUND
            </Typography>
            <Typography sx={{fontSize:'2rem', fontWeight:'bold', mt:-1}}>
                5,000 $
            </Typography>
                    </Box>
    </Box>
    <Box sx={{ml:5, display:'flex'}}>
    <Box>
            <CalendarTodayIcon sx={{fontSize:'3rem', mr:1}} />
        </Box>
        <Box>
            <Typography sx={{fontSize:'12px', ml:0.25}}>
                REGISTRATION DEADLINE
            </Typography>
            <Typography sx={{fontSize:'1.5rem', fontWeight:'bold',}}>
                01 November, 2023
            </Typography>
                    </Box>
    </Box>
  </Box>
  <StyledButton variant='contained' className='bg-white'>
    Register Now 
  </StyledButton>
    </Box>
    </div> 
</div>
       <BottomPage /> 
    </Page>
  )
}

export default CompetetionPage
