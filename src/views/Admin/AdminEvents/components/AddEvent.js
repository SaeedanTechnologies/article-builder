import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, TextField, Select, MenuItem, DialogActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../../../store/actions/userActions';
import { useSnackbar } from 'notistack';
import { ThreeDots } from 'react-loader-spinner';

const AddEvent = (props) => {
  const initialValues = {
    name: '',
    date: getCurrentDate(),
    location: ''
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLocationChange = (e) => {
    setFormValues({ ...formValues, location: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    setloading(true);
    e.preventDefault();
    const formData = new FormData();
    if (!selectedImage) {
      setloading(false);
      alert('Please select an image');
    } else {
      formData.append('name', formValues.name);
      formData.append('date', formValues.date);
      formData.append('location', formValues.location);
      formData.append('image', selectedImage);
      dispatch(createEvent(formData))
        .then((result) => {
          setloading(false);
          setSelectedImage(null);
          setFormValues(initialValues);
          props.close();
          props.createSuccess()
          enqueueSnackbar(result.data.message, {
            variant: 'success',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.close} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Event</DialogTitle>
          <Divider />
          <DialogContent>
            <Box sx={{ height: '40vh', border: '1px dashed grey', position: 'relative', marginTop: 2 }}>
              {selectedImage && (
                <div
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(selectedImage)}`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              )}
            </Box>
            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
              <input type="file" accept="image/*" id="image-upload" style={{ display: 'none' }} onChange={handleImageChange} />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="outlined" component="span">
                  Choose Image
                </Button>
              </Box>
            </label>
            <TextField
              label="Event Name"
              fullWidth
              sx={{ mt: 2 }}
              name="name"
              value={formValues.name}
              onChange={handlechange}
              required
            />
            <TextField
              label="Select Date"
              type="date"
              sx={{ mt: 2 }}
              fullWidth
              name="date"
              value={formValues.date}
              onChange={handlechange}
              required
            />
            <Select
              label="Select Location"
              name="location"
              required
              value={formValues.location}
              onChange={handleLocationChange}
              sx={{ mt: 2 }}
              fullWidth
            >
              <MenuItem value="Location 1">Location 1</MenuItem>
              <MenuItem value="Location 2">Location 2</MenuItem>
              <MenuItem value="Location 3">Location 3</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} variant='outlined'>Close</Button>

            <Button type="submit" variant={loading ? 'disabled' : "contained"} className='bg-[#3e50ce]'>
              {loading ?
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
                :
                'Create Event'
              }
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddEvent;
