import React, { useRef } from 'react'
import Page from '../../../../components/page'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography, styled } from '@mui/material'

import { Download, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router'
const StyledRoot = styled(Box)(({theme})=> ({
  padding: theme.spacing(10,5),
}))
const Certificate = () => {
  const data = [
    { title: 'React Certificate', date: '11-Nov-2023', img: '/assets/images/comp.jpg' },
    { title: 'JavaScript Mastery', date: '15-Dec-2023', img: '/assets/images/comp1.jpg' },
    { title: 'Web Development Pro', date: '20-Jan-2024', img: '/assets/images/comp.jpg' },
    { title: 'Node.js Certification', date: '05-Mar-2024', img: '/assets/images/comp2.jpeg' },
    { title: 'Frontend Wizardry', date: '10-Apr-2024', img: '/assets/images/comp3.webp' }
];
  
    const navigate = useNavigate()
    const handleNavigate = (data) => {
      navigate('/user/view-certificate', {state:data})
    }
  return (
    <Page title="Certificates">
      <StyledRoot>

    <Typography variant='h3'  fontWeight="bold">Certificates</Typography>
    <Divider sx={{my:3}}/>
    <Grid container spacing={3}>
      {
        data.map((val)=> {
          return(
        <Grid item xs={12} md={6} lg={3}>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Certificate"
        image={val.img}
        style={{ maxHeight: 150, width: '100%' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {val.date}
        </Typography>
        <Typography variant="h5" color="text.secondary" fontWeight="bold">
          {val.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='outlined'
        onClick={()=>handleNavigate(val)}
        startIcon={
          <Visibility />
        }
        endIcon={
          <Download />
        }
        >View / Download</Button>
      </CardActions>
    </Card>
        </Grid>
          )
        })
      }
    </Grid>
    {/* <Button 
    onClick={downloadPDF}
    >
      Download
    </Button> */}
      </StyledRoot>
    </Page>
  )
}

export default Certificate