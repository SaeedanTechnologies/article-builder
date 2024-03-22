import React from 'react'
import { StyledCard } from '../styles'
import { Avatar, Stack, Typography } from '@mui/material'
import LoyaltyIcon from '@mui/icons-material/Loyalty';
const Cardcomp = (props) => {
  return (
    <div>
      <StyledCard
      elevation={0}
      sx={{background:props.main, mt:2,}}>
        <Stack>
          <Avatar sx={{background:props.av}}>
            {props.Avatar}
          </Avatar>
          <Typography sx={{fontWeight:800, fontSize:'1.5rem', mt:1}}>
            {props.total}
          </Typography>
          <Typography>
            {props.title}
          </Typography>
        </Stack>
      </StyledCard>
    </div>
  )
}

export default Cardcomp
