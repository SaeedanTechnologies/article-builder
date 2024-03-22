import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import Page from '../../../../components/page'
import { Box, Button, MenuItem, Select, TextField, Typography, styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import { editEvent } from '../../../../store/actions/userActions'
import { useSnackbar } from 'notistack'
const StyledRoot = styled(Box)(({theme})=>({
    minHeight:'100vh',
    padding:theme.spacing(4)
}))
const EditEvent = () => {
    React.useEffect(()=> {
    setFormValues({
        ...formValues,
        name:state.name,
        location:state.location,
    })
    // setSelectedImage()
    }, [])
    const initialValues = {
        name: '',
        date: getCurrentDate(),
        location: ''
      };
    const {state} = useLocation()
    const [formValues, setFormValues] = React.useState(initialValues)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = React.useState(false)
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

      const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        dispatch(editEvent(formValues, state.id)).then((result) => {
            setLoading(false)
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
            navigate('/admin/events')
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
      }
  return (
    <Page title="Edit Event">
    <StyledRoot>
        <Typography variant='h3' textAlign="center" fontWeight="bold" sx={{mb:2}}>
            Update Info
        </Typography>
        <form onSubmit={handleSubmit}>

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
            <Button variant={loading ? 'disabled' : 'contained'}
            type='submit'
             sx={{mt:3, float:'right'}} className='bg-[#3e50ce]'>
                {
                    loading ? 
                    'Please Wait....' :
                    'Update'
                }
            </Button>
              </form>
    </StyledRoot>
    </Page>
  )
}

export default EditEvent
