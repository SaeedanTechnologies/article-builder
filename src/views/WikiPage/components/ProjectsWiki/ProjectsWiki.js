import { Box, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
const StyledRoot = styled(Box)(({theme})=>({
    padding:theme.spacing(8),
}))
const cardData = [
    {id:1, img:'/assets/images/hospital.jpg', title:'Hospitals', to:'/wiki-page/hospitals'},
    {id:2, img:'/assets/images/mall.jpg', title:'Mall'},
    {id:3, img:'/assets/images/villa.webp', title:'Villa'},
    {id:4, img:'/assets/images/museum.jpeg', title:'Museum'},
    {id:5, img:'/assets/images/exibition.avif', title:'Exhibition'},
    {id:6, img:'/assets/images/stadium.jpg', title:'Stadium'},
]
const ProjectsWiki = () => {
  return (
    <div>
        <StyledRoot>
            <Typography variant='h4' textAlign="center" mb={2} color="#777" fontWeight="bold">Arc Data</Typography>
            <Grid container spacing={3}>
                {cardData.map((val, ind)=> {
                   return(
                <Grid item xs={12} md={4} lg={4}>
      <Box sx={{height:'200px', width:'250px', cursor:'pointer'}}
      component={Link}
      to="/test"
      >
        <img src={val.img} style={{objectFit:'cover', height:'180px'}}/>
        <Typography variant='h6' textAlign="center" fontWeight="bold" color="#777777"> {val.title}</Typography>
      </Box>
                </Grid>
                   ) 
                })}
            </Grid>
        </StyledRoot>
    </div>
  )
}

export default ProjectsWiki
