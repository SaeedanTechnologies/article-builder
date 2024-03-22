import { Facebook, Instagram, LinkedIn, Pinterest, Twitter, YouTube } from '@mui/icons-material'
import { Box, Button, Typography, styled } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const StyledFooter = styled(Box)(({ theme }) => ({
  minHeight: '25vh',
  background: theme.palette.primary.main,
  padding: theme.spacing(3),

}))
const StyledRoot = styled(Box)(({ theme }) => ({
  display: "flex", justifyContent: "center", alignItems: "center",
  width: "100%", height: "auto"
}))
const StyledTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginRight: 10,
  color: '#1e1e1e'
}))

const Footer = () => {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <StyledRoot>
        <Box sx={{display:'flex'}}>
        <StyledTypo>
        {t('work')}
        </StyledTypo>
        <StyledTypo>
        {t('tos')}
        </StyledTypo>
        <StyledTypo>
        {t('pp')}
        </StyledTypo>
        <StyledTypo>
        {t('cp')}
        </StyledTypo>
        <StyledTypo>
        {t('rss')}
        </StyledTypo>
        <StyledTypo>
        {t('contactus')}
        </StyledTypo>
        </Box>
        <Box sx={{mt:2, display:'flex'}}>
          <Box>
          <img src="/assets/images/log.png" style={{height:'100px'}} /> 
          </Box>
          <Box sx={{mt:1.5, ml:-1}}>
            <Typography sx={{color:'#1e1e1e'}}>&copy;{t('arr')} </Typography>
            <Typography sx={{color:'#1e1e1e'}}>ISSN 0719-8884 </Typography>
            <Typography sx={{color:'#1e1e1e'}}>{t('aia')}</Typography>

          </Box>
        </Box>
      </StyledRoot>
    </StyledFooter >
  )
}

export default Footer
