import React from 'react';
import {
  AppBar,
  Avatar,
  Button,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Outlet } from 'react-router';

const WikiPageLayout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleFilterButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar sx={{ background: '#fff', height: '80px' }} elevation={0} position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', color: '#000' }}>
          <img src="/assets/images/log.png" style={{ height: '80px' }} />
          <TextField
            variant="outlined"
            placeholder="Search..."
            size='small'
            sx={{
              background: '#e2e2e2',
              width: '500px',
              borderColor: '#fff',
              "& fieldset": { border: 'none' },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mr: '-23%', ml: '25%', display: 'flex', alignItems: 'center' }} >
            <Avatar />
            <MenuIcon sx={{ ml: 2 }} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ color: '#000', display: 'flex', mb: 3 }}>
        <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.1)', height: '100vh', width: '30%', p: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size='small'
            sx={{
              width: '100%',
              marginBottom: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton color="inherit" onClick={handleFilterButtonClick} style={{ backgroundColor: 'transparent' }}>
            <FilterListIcon /> <Typography sx={{ml:1, fontWeight:'bold'}}>Filter</Typography>
          </IconButton>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
                style: {
                  width: '250px',
                },
              }}
          >
            <MenuItem>
              <Typography variant="h6">Refine by:</Typography>
            </MenuItem>

              <Typography variant="subtitle1" sx={{ml:2}}>Categories</Typography>
            <MenuItem>
                <FormControlLabel control={<Checkbox />} label="Category 1" />
            </MenuItem>
              <MenuItem>
                <FormControlLabel control={<Checkbox />} label="Category 2" />
              </MenuItem>
              <MenuItem>
                <FormControlLabel control={<Checkbox />} label="Category 3" />
            </MenuItem>
              <MenuItem>
                <FormControlLabel control={<Checkbox />} label="Category 4" />
              </MenuItem>
              <Typography variant="subtitle1" sx={{ml:2}}>Application supported</Typography>

            <MenuItem>
                <FormControlLabel control={<Checkbox />} label="App 1" />
            </MenuItem>
              <MenuItem>
                <FormControlLabel control={<Checkbox />} label="App 2" />
              </MenuItem>
              <MenuItem>
                <FormControlLabel control={<Checkbox />} label="App 3" />
              </MenuItem>
              <MenuItem>
                <FormControlLabel control={<Checkbox />} label="App 4" />
              </MenuItem>
              <Button variant="outlined" sx={{m:3, ml:8}}>Apply filters</Button>
          </Menu>
        </Box>
        <Box sx={{ border: '1px solid rgba(0,0,0,0.1)', minHeight: '100vh', width: '70%' }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default WikiPageLayout;
