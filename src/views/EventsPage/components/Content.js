import React from 'react'
import { StyledContentRoot } from '../styles'
import { Box, Button, Grid, Typography, styled } from '@mui/material'
import Images from './Images'
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
const StyledButton = styled(Button)(({theme})=>({
    backgroundColor:'#fff',
    marginTop:'2.5rem',
    borderRadius:'20px',
    height:'50px',

}))

const Content = () => {
  return (
    <StyledContentRoot>
            <Grid
            container
            >
                <Grid
                item
                xs={12}
                md={6}
                lg={6}
                >
                   <Box sx={{p:7}}>
                        <Box sx={{display:'flex', alignItems:'center', mb:1}}>
                         <DateRangeIcon sx={{mr:1, color:'#fff'}} /> 
                    <Typography fontWeight="bold" sx={{color:'#fff'}}>
                         DEC-22-2023 &nbsp; 10:00pm
                    </Typography>
                        </Box>
                    <Typography variant='h2' width="80%" fontWeight="bold" sx={{color:'#fff', lineHeight:'1'}}>
                        Biggest International Science Summit
                    </Typography>
                    <StyledButton variant='contained' className='bg-[#6152C7]'
                    startIcon={
                        <LocalActivityIcon />
                    }
                    >
                        Buy Tickets
                    </StyledButton>
                   </Box>
                </Grid>
                <Grid
                item
                xs={12}
                md={6}
                lg={6}
                >
                    <Images />
                </Grid>
            </Grid>
    </StyledContentRoot>
  )
}

export default Content
