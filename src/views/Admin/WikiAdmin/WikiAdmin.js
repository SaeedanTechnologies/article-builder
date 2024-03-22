import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import Page from '../../../components/page'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ShopDrawing from './components/ShopDrawing';
import ArcData from './components/ArcData';
import Projects from './components/Projects';
const StyledRoot = styled(Box)(({theme})=>({
    padding:theme.spacing(5)    
}))
const WikiAdmin = () => {
    const [value, setValue] = React.useState(1);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Page title="Wiki">
        <StyledRoot>
            <Typography variant='h4' textAlign="center" fontWeight="bold" mb={2}>Select Category you want to add</Typography>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Select Category"
          onChange={handleChange}
        >
          <MenuItem value={1}>Shop Drawing</MenuItem>
          <MenuItem value={2}>Arc Data</MenuItem>
          <MenuItem value={3}>Projects</MenuItem>
        </Select>
      </FormControl>
      {value === 1 && <ShopDrawing />}
      {value === 2 && <ArcData />}
      {value === 3 && <Projects />}
        </StyledRoot>
    </Page>
  )
}

export default WikiAdmin
