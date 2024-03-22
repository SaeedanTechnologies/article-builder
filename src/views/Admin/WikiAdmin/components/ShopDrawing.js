import React, { useState } from 'react';
import { Box, Typography, styled, Button, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addShopDrawing } from '../../../../store/actions/shopDrawing';
import { ThreeDots } from 'react-loader-spinner';

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 2),
}));
const initalValues = {
    title :'',
}
const ShopDrawing = () => {
    const [formValues, setFormValues] = useState(initalValues)
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useDispatch()
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleChange = (e) => { 
    const {name, value} = e.target
    setFormValues({...formValues, [name] : value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!selectedFile) {
        enqueueSnackbar('Please Upload file in order to continue', {
            variant:'error'
        })
    }
    else {
        setLoading(true)
        const formData = new FormData()
        formData.append('title', formValues.title)
        formData.append('file', selectedFile)
        dispatch(addShopDrawing(formData)).then((result) => {
            setLoading(false)
            setFormValues(initalValues)
            setSelectedFile(null)
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
    }

  }
  return (
    <StyledRoot>
      <Typography variant="h6" textAlign="center" fontWeight="bold">
        Add Shop Drawing
      </Typography>
      <form onSubmit={handleSubmit}>

      <TextField label="Title" fullWidth margin="normal"
      name="title"
      value={formValues.title}
      onChange={handleChange}
      required
      />
      <input
        type="file"
        id="file-input"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <Button variant="outlined" component="span" fullWidth>
          Upload PDF
        </Button>
      </label>
      {selectedFile && (
          <iframe
          title="Selected PDF"
          src={URL.createObjectURL(selectedFile)}
          style={{ width: '100%', height: '500px', marginTop: '10px' }}
          />
          )}
          {
            loading ?
            <ThreeDots 
              height="100" 
              width="100" 
              radius="9"
              color="#3e50ce" 
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
              /> :
      <Button variant='contained' sx={{mt:3}} className='bg-[#414ECF]' type='submit'>
        Upload
      </Button>
    }
          </form>
    </StyledRoot>
  );
};

export default ShopDrawing;
