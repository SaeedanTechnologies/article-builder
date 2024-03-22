import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
  styled,
  Button,
  DialogActions,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { getArchDataAdmin, updateSpecsDetailsAction } from '../../../../store/actions/archDataActions';
import { useSnackbar } from 'notistack';

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8),
}));

const initialValues = {
  specs_title: '',
  description: '',
  detail1: '',
  detail2: '',
  specs_more_file: [],
};

const UpdateSpecsDetails = () => {
  const [data, setData] = useState([]);
  const [selectedVal, setSelectedVal] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar()
  const getData = () => {
    dispatch(getArchDataAdmin())
      .then((result) => {
        setData(result.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedVal(value);

    setFormValues(initialValues);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;

    setFormValues((prevValues) => ({
      ...prevValues,
      specs_more_file: Array.from(files),
    }));

    const imageArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      imageArray.push({ id: i, src: URL.createObjectURL(file) });
    }
    setUploadedImages([...imageArray]);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleDialogOpen =(id) => {
    setId(id)
    setOpen(true)

  } 
  const handleClose = () => {
    setId('')
    setOpen(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateSpecsDetailsAction(formValues, id)).then((result) => {
        enqueueSnackbar(result.data.message, {variant:'success'})
        setFormValues(initialValues)
        handleClose()
        setUploadedImages([]);
    }).catch((err) => {
        console.log(err)
    });
    // console.log('Form Submitted:', formValues);
  };
  return (
    <StyledRoot>
      <Typography variant="h4" textAlign="center" fontWeight="bold">
        Select the data you want to update
      </Typography>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel id="demo-simple-select-label">Select Data</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedVal}
          label="Select Data"
          onChange={handleChange}
        >
          {data.map((val, ind) => (
            <MenuItem key={ind} value={val}>
              {val.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography sx={{ my: 5 }} variant="h4">
        {selectedVal ? selectedVal.title : 'Please Select data..'}
      </Typography>
      <Grid container spacing={3}>
        {selectedVal.arch_data_specs?.map((val, ind) => (
          <Grid key={ind} item xs={12} md={4} lg={4}>
            <Box sx={{ height: '200px', width: '250px', cursor: 'pointer' }}
            onClick={()=> handleDialogOpen(val.id)}
            >
              <img
                src="/assets/images/spaces.jpg"
                style={{ objectFit: 'cover', height: '180px' }}
              />
              <Typography
                variant="h6"
                textAlign="center"
                fontWeight="bold"
                color="#777777"
              >
                {val.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} fullWidth onClose={handleClose}>
        <form onSubmit={handleSubmit}>

        <DialogTitle>Update Details</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            name="specs_title"
            label="Title"
            fullWidth
            sx={{ mb: 2 }}
            value={formValues.specs_title}
            onChange={handleFormChange}
            required
            />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            sx={{ mb: 2 }}
            value={formValues.description}
            onChange={handleFormChange}
            required

            />
          <Box sx={{ display: 'flex' }}>
            <TextField
              name="detail1"
              label="Detail 1"
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2, mr: 2 }}
              value={formValues.detail1}
              onChange={handleFormChange}
            required

            />
            <TextField
              name="detail2"
              label="Detail 2"
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2 }}
              value={formValues.detail2}
              onChange={handleFormChange}
            required

            />
          </Box>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', mt: 2 }}>
            {uploadedImages.map((image) => (
                <img
                key={image.id}
                src={image.src}
                alt={`uploaded-${image.id}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" className='bg-[#000]' type='submit'>
            Submit
          </Button>
        </DialogActions>
                </form>
      </Dialog>
    </StyledRoot>
  );
};

export default UpdateSpecsDetails;
