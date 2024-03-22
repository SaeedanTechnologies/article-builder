import React from 'react'
import {
  StyledProjectCard,
  StyledProjectRoot,
  StyledProjectTop,
  StyledProjectBottom
} from './styles'
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import Top from './components/ShopDrawing/components/Top';
import Bottom from './components/ShopDrawing/components/Bottom';
import Footer from '../../layouts/Landing/Footer';
const WikiCategories = () => {
  return (
    <div>
      <StyledProjectRoot>
        <StyledProjectCard>
          <StyledProjectTop>
            <Top />
          </StyledProjectTop>
          <Divider sx={{mt:3}} />
              <StyledProjectBottom>
              <Bottom />
              </StyledProjectBottom>
              <Divider sx={{mt:1}} />
                <Footer />
        </StyledProjectCard>
      </StyledProjectRoot>
    </div>
  )
}

export default WikiCategories
