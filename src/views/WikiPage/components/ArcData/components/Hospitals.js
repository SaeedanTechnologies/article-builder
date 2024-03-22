import { Box, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const StyledRoot = styled(Box)(({theme})=>({
    padding:theme.spacing(8),
}))
const cardData = [
    {id:1, img:'/assets/images/spaces.jpg', title:'Spaces', to:'/categories'},
    {id:2, img:'/assets/images/spaces.jpg', title:'Spaces'},
    {id:3, img:'/assets/images/spaces.jpg', title:'Spaces'},
    {id:4, img:'/assets/images/spaces.jpg', title:'Spaces'},
    {id:5, img:'/assets/images/spaces.jpg', title:'Spaces'},
    {id:6, img:'/assets/images/spaces.jpg', title:'Spaces'},

   
]
const Hospitals = () => {
  const {state} = useLocation()
  // console.log(state.arch_data_specs)
  const navigate = useNavigate()
  const handleNavigate = (val) => {
    navigate('/test',{state:val})
  }
  return (
    <StyledRoot>
            <Typography variant='h4' textAlign="center" mb={2} color="#777" fontWeight="bold">List Of Avialable Spaces</Typography>
            <Grid container spacing={3}>
                {state.arch_data_specs?.map((val, ind)=> {
                   return(
                <Grid item xs={12} md={4} lg={4}>
      <Box sx={{height:'200px', width:'250px', cursor:'pointer'}}
      onClick={()=>handleNavigate(val)}
      >
        <img src="/assets/images/spaces.jpg" style={{objectFit:'cover', height:'180px'}}/>
        <Typography variant='h6' textAlign="center" fontWeight="bold" color="#777777"> {val.title}</Typography>
      </Box>
                </Grid>
                   ) 
                })}
            </Grid>
    </StyledRoot>
  )
}

export default Hospitals
