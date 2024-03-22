import React, { useState } from 'react';
import {
  Box,
  Button,
  styled,
  Typography,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addArchData } from '../../../../store/actions/archDataActions';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 2),
}));

const ArcData = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [specs_titles, setSpecsTitles] = useState([]);
  const [specs_files, setSpecsFiles] = useState([]);
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar()
  const [formData, setFormData] = useState({
    arch_title: '',
    arch_file: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFormData({ ...formData, arch_file: file });
  };

  const handleAddSpecs = () => {
    setSpecsTitles([...specs_titles, '']);
    setSpecsFiles([...specs_files, null]);
  };

  const handleImageUpload = (index) => (event) => {
    const file = event.target.files[0];

    setSpecsFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = file;
      return newFiles;
    });
  };

  const handleSubmit = () => {
    const specsData = specs_titles.map((title, index) => ({
      title,
      file: specs_files[index],
    }));
  
    const sendData = new FormData();
    sendData.append('arch_title', formData.arch_title);
    sendData.append('arch_file', formData.arch_file);
    specs_titles.forEach((title, index) => {
      sendData.append(`specs_title[${index}]`, title);
    });
    
    specs_files.forEach((file, index) => {
      sendData.append(`specs_file[${index}]`, file);
    });
  
    dispatch(addArchData(sendData))
      .then((result) => {
        enqueueSnackbar(result.data.message, {
            variant:'success'
        });
  
        setSelectedFile(null);
        setSpecsTitles([]);
        setSpecsFiles([]);
        setFormData({
          arch_title:'',
          arch_file: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <StyledRoot>
      <Button variant='contained' className="bg-[#414ECF]" component={Link} to="/admin/update-specs">Update Specs Details</Button>
      <Typography variant="h6" textAlign="center" fontWeight="bold">
        Add Arch Data
      </Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        name='arch_title'
        value={formData.arch_title}
        onChange={(e) => setFormData({ ...formData, arch_title: e.target.value })}
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
          style={{ width: '100%', height: '200px', marginTop: '10px' }}
        />
      )}
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        className="bg-[#414ECF]"
        onClick={handleAddSpecs}
      >
        Add Specs
      </Button>
      {specs_titles.map((title, index) => (
        <Box key={index} sx={{ border: '1px solid #000', mt: 2, p: 1 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <label htmlFor={`image-input-${index}`}>
                <Button variant="outlined" fullWidth component="span">
                  Upload Image
                </Button>
              </label>
              <input
                type="file"
                id={`image-input-${index}`}
                style={{ display: 'none' }}
                onChange={handleImageUpload(index)}
              />
              {specs_files[index] && (
                <img
                  src={URL.createObjectURL(specs_files[index])}
                  alt={`Selected Image ${index + 1}`}
                  style={{ width: '100%', marginTop: '10px', height: '300px', objectFit: 'cover' }}
                />
              )}
            </Box>
            <Box sx={{ width: '60%' }}>
              <TextField
                label={`Title ${index}`}
                fullWidth
                margin="normal"
                onChange={(e) => {
                  setSpecsTitles((prevTitles) => {
                    const newTitles = [...prevTitles];
                    newTitles[index] = e.target.value;
                    return newTitles;
                  });
                }}
              />
            </Box>
          </Box>
        </Box>
      ))}
      <Button
        fullWidth
        variant="contained"
        className="bg-[#414ecf]"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </StyledRoot>
  );
};

export default ArcData;
