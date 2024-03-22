import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  styled,
  Button,
  CircularProgress,
} from '@mui/material';
import Page from '../../../../../components/page';
import { useDispatch } from 'react-redux';
import { addCompetition } from '../../../../../store/actions/competetionActions';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

const StyledRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const initialValues = {
  title: '',
  description: '',
  pdf: null,
  total_prize: '',
  first_prize: '',
  second_prize: '', // Fixed typo here
  third_prize: '', // Fixed typo here
  date: [],
  date_description: [],
  fees: [],
  fees_description: [],
  image: null,
  image_description: [],
  member_image: null,
  member_name: [],
  member_designation: [],
  member_country: [],
};

const AddCompetition = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [loading , setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
  const handleFormSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData()
    formData.append("title",formValues.title)
    formData.append("description",formValues.description)
    formData.append("pdf",formValues.pdf)
    formData.append("total_prize",formValues.total_prize)
    formData.append("first_prize",formValues.first_prize)
    formData.append("second_prize",formValues.second_prize)
    formData.append("third_prize",formValues.third_prize)
    formData.append("date[]",formValues.date)
    formData.append("date_description[]",formValues.date_description)
    formData.append("fees[]",formValues.fees)
    formData.append("fees_description[]",formValues.fees_description)
    formData.append("image[]",formValues.image)
    formData.append("image_description[]",formValues.image_description)
    formData.append("member_image[]",formValues.member_image)
    formData.append("member_name[]",formValues.member_name)
    formData.append("member_designation[]",formValues.member_designation)
    formData.append("member_country[]",formValues.member_country)

    dispatch(addCompetition(formData)).then((result) => {
        setLoading(false)
        setFormValues(initialValues)
        enqueueSnackbar(result.data.message, {
            variant : 'success' ,
        })
        navigate('/admin/competetions')
    }).catch((err) => {
        setLoading(false)
        console.log(err)
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormValues({
        ...formValues,
        [name]: files[0],
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  return (
    <Page title="Add Competition">
      <StyledRoot>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                required
                fullWidth
                label="Description"
                multiline
                rows={4}
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Upload PDF File
              </Typography>
              <label htmlFor="pdfFileInput">
                <Box
                  border={1}
                  borderColor="black"
                  borderStyle="dashed"
                  borderRadius={1}
                  p={2}
                  textAlign="center"
                  style={{ cursor: 'pointer' }}
                >
                  {formValues.pdf ? formValues.pdf.name : 'Click to Upload PDF File'}
                </Box>
              </label>
              <input
              required
                type="file"
                id="pdfFileInput"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={handleInputChange}
                name="pdf"
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <TextField
              required
                fullWidth
                label="Total Prize"
                name="total_prize"
                value={formValues.total_prize}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <TextField
              required
                fullWidth
                label="1st Prize"
                name="first_prize"
                value={formValues.first_prize}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <TextField
              required
                fullWidth
                label="2nd Prize"
                name="second_prize"
                value={formValues.second_prize}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <TextField
              required
                fullWidth
                label="3rd Prize"
                name="third_prize"
                value={formValues.third_prize}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
              required
                fullWidth
                type="date"
                name="date"
                value={formValues.date}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
              required
                fullWidth
                label="Date Description"
                multiline
                rows={4}
                name="date_description"
                value={formValues.date_description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
              required
                fullWidth
                label="Fees"
                name="fees"
                value={formValues.fees}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
              required
                fullWidth
                label="Fees Description"
                name="fees_description"
                value={formValues.fees_description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
              required
                fullWidth
                label="Fees"
                name="fees"
                value={formValues.fees}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
              required
                fullWidth
                label="Fees Description"
                name="fees_description"
                value={formValues.fees_description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                border={1}
                borderColor="primary.main"
                borderRadius={1}
                p={2}
                textAlign="center"
                onClick={() => {
                  document.getElementById(`fileInput1`).click();
                }}
                style={{ cursor: 'pointer' }}
              >
                {formValues.image ? (
                  <img
                    src={URL.createObjectURL(formValues.image)}
                    alt="Selected"
                    style={{ width: '100%' }}
                  />
                ) : (
                  'Click to Select Image'
                )}
              </Box>
              <input
              required
                type="file"
                id={`fileInput1`}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleInputChange}
                name="image"
              />
              <TextField
              required
                sx={{ mt: 1 }}
                fullWidth
                label="Image Description"
                multiline
                rows={4}
                name="image_description"
                value={formValues.image_description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4}>
              <TextField
              required
                fullWidth
                label="Member name"
                name="member_name"
                value={formValues.member_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <TextField
              required
                fullWidth
                label="Member Designation"
                name="member_designation"
                value={formValues.member_designation}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <TextField
              required
                fullWidth
                label="Member Country"
                name="member_country"
                value={formValues.member_country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Member Image
              </Typography>
              <Box
                border={1}
                borderColor="primary.main"
                borderRadius={1}
                p={2}
                textAlign="center"
                onClick={() => {
                  document.getElementById(`fileInput2`).click();
                }}
                style={{ cursor: 'pointer' }}
              >
                {formValues.member_image ? (
                  <img
                    src={URL.createObjectURL(formValues.member_image)}
                    alt="Selected"
                    style={{ width: '100%' }}
                  />
                ) : (
                  'Click to Select Image'
                )}
              </Box>
              <input
              required
                type="file"
                id={`fileInput2`}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleInputChange}
                name="member_image"
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Button type="submit" disabled={loading} variant='contained'
              className='bg-black'
              >
                {
                    loading ? <CircularProgress /> : 'Submit'
                }
                
                
                </Button>
            </Grid>
          </Grid>
        </form>
      </StyledRoot>
    </Page>
  );
};

export default AddCompetition;
