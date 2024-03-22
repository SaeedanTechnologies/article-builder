import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Input, Grid, InputAdornment, Divider } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Page from '../../components/page/page';
const AddPost = () => {
  const [pinTitle, setPinTitle] = useState('');
  const [pinDescription, setPinDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePinTitleChange = (event) => {
    setPinTitle(event.target.value);
  };

  const handlePinDescriptionChange = (event) => {
    setPinDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleCreatePin = () => {
    setPinTitle('');
    setPinDescription('');
    setSelectedImage(null);
  };
  return (
    <Page title="Create Pin">
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Container>
      <Card variant="outlined" style={{ borderRadius: '12px' }}>
        <CardContent style={{ background: 'white' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  style={{marginLeft:'110px', width: '320px', height: '90%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ backgroundColor: '#e1e1e1',marginLeft:'110px', width: '320px', height: '90%',  paddingTop: '100%', position: 'relative' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  <Button variant="contained" 
                  color="primary" 
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                 
                  >
                    Add Picture
                  </Button>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h4' style={{ fontWeight: 'bold', color:'gray' ,marginBottom: '10px'}}>
                Add your Title
              </Typography>
              <Divider  style={{ backgroundColor: 'gray', height:'1.5px', width:'85%', marginBottom:'50px' }} />
              <TextField
      id="input-with-icon-textfield"
      style={{width: '85%', marginTop: '50px'}}
      
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      variant="standard"
    />
             <Typography variant='h4' style={{ fontWeight: 'bold', color:'gray' ,marginTop: '100px',marginBottom:'10px'}}>
                Add your Description
              </Typography>
              <Divider  style={{ backgroundColor: 'gray', height:'1.5px', width:'85%', marginBottom:'50px' }} />
              <TextField
      id="input-with-icon-textfield"
      style={{width: '85%', marginTop: '50px'}}
      
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      variant="standard"
    />
    <br/>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreatePin}
                style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}
              >
                Create Pin
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  </div>
  </Page>
);
};

export default AddPost
