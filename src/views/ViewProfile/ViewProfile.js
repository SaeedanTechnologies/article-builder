import { Avatar, Box, Button, Card, CardActions, Divider, Grid, Stack, TextField, Tooltip, Typography, styled } from '@mui/material';
import React, { useRef, useState } from 'react';
import Page from '../../components/page';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar, updateProfileInfo } from '../../store/actions/userActions';
import { ThreeDots } from 'react-loader-spinner';

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  marginTop: theme.spacing(8),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxHeight: '50vh',
  minHeight: '50vh',
  mt: 2,
}));

const initialValues = {
    name:'',
    phone:''
}

const ViewProfile = () => {
  const user = useSelector((state) => state.admin.user);
//   console.log(user)
  const avatarInputRef = useRef(null);
  const dispatch = useDispatch()
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formValues, setFormValues] = React.useState(initialValues)
  const [submitButton, setSubmitButton] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [avatarSrc, setAvatarSrc] = useState('');
  const [selectedFile , setSelectedFile] = React.useState('')

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]:value})
    const isFormChanged = formValues.name !== user.name || formValues.phone !== user.phone;
    setSubmitButton(!isFormChanged);
  }

  const handleAvatarClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  // const handleAvatarChange = (e) => {
  //   setSelectedFile(e.target.files[0]);

  //   if (selectedFile) {
  //     setSelectedFileName(selectedFile.name);
  //     setIsButtonDisabled(false); 
  //     setAvatarSrc(URL.createObjectURL(selectedFile))
  //   //   console.log('Selected file:', selectedFile);
  //   } else {
  //     setSelectedFileName('No file chosen');
  //     setIsButtonDisabled(true);
  //     setAvatarSrc('');
      
  //   }
  // };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
      setIsButtonDisabled(false);
  
      // Use FileReader to create a base64 representation of the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile('');
      setSelectedFileName('No file chosen');
      setIsButtonDisabled(true);
      setAvatarSrc('');
    }
  };
  

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    dispatch(updateProfileInfo(formValues.name, formValues.phone)).then((result) => {
        setLoading(false)
        console.log(result)
    }).catch((err) => {
        setLoading(false)
        console.log(err)
    });
  }

  React.useEffect(() => {
    setFormValues({
      name: user.name,
      phone: user.phone_number,
    });
  }, [user]);
  const handleUpdateAvatar = () => {
    const formData = new FormData()
    formData.append("profile_image", selectedFile)
    dispatch(updateAvatar(formData)).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  }
  return (
    <Page title="View Profile">
      <StyledRoot>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <StyledCard>
              <Stack>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip title="Upload Avatar">
                    <Avatar
                      sx={{ height: '130px', width: '130px', cursor: 'pointer', my: 3, ml: 1 }}
                      onClick={handleAvatarClick}
                      src={avatarSrc}
                    />
                  </Tooltip>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                  />
                </Box>
                <Box>
                  <Typography textAlign="center" sx={{ mb: 1 }}>{selectedFileName}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Button
                      className='bg-[#3e50ce]'
                      sx={{ ml: 3 }}
                      variant='contained'
                      disabled={isButtonDisabled}
                      onClick = {handleUpdateAvatar}
                    >
                      Upload avatar
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <StyledCard
            sx={{p:4}}
            >
                <Typography sx={{mb:1, fontWeight:'bold'}} variant='h6'>
                    Update your information
                </Typography>
                <Divider />
                <form onSubmit={handleSubmit}>
                <Box sx={{mt:2}}>
                    <Grid container spacing={2}>
                        <Grid item
                        xs={12}
                        md={12}
                        lg={12}
                        >
                        <TextField label="Name" fullWidth 
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        />
                        </Grid>
                        <Grid item
                        xs={12}
                        md={12}
                        lg={12}
                        >
                        <TextField label="Phone" fullWidth 
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        />
                        </Grid>
                    </Grid>
                </Box>
                <CardActions>
                    {
                        loading ? 
                        <Button
                    sx={{mt:1}}
                    variant='contained'
                    >
                        <ThreeDots 
                        height="25" 
                        width="40" 
                        radius="9"
                        color="#fff" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                            />
                    </Button> :
                    <Button
                    sx={{mt:1}}
                    variant='contained'
                    className='bg-[#3e50ce]'
                    type='submit'
                    disabled={submitButton}
                    >
                        Update
                    </Button>
                    }
                </CardActions>
                        </form>
            </StyledCard>
          </Grid>
        </Grid>
      </StyledRoot>
    </Page>
  );
};

export default ViewProfile;
