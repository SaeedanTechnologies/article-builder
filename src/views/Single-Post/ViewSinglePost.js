import { Box, Button, Card, CardActions, Grid, Stack, Typography, styled } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import Page from '../../components/page';
import { DeleteForever, Edit } from '@mui/icons-material';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deletePost } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ThreeDots } from 'react-loader-spinner';
const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  marginTop: theme.spacing(8),
}));
const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '80vh'
}))
const ViewSinglePost = () => {
  const { state } = useLocation()
  console.log({ state })
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const handleEdit = () => {
    navigate('/user/edit-post', { state: state, replace: true })
  }
  const handleDelete = () => {
    confirmAlert({
      title: 'Delete Post?',
      message: 'Are you sure to want to delete this post ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setLoading(true)
            dispatch(deletePost(state.id)).then((result) => {
              setLoading(false)
              enqueueSnackbar(result.data.message, {
                variant: 'success'
              })
              navigate('/user/all-posts', { replace: true })
            }).catch((err) => {
              setLoading(false)
              console.log(err)
            });
          }
        },
        {
          label: 'No',
        }

      ]
    })
  }
  return (
    <Page title="Post">
      <StyledRoot>
        {loading ?
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <ThreeDots
              height="85"
              width="80"
              radius="9"
              color="#3e50ce"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </Box>
          :
          <StyledCard >
            <Grid container sx={{ height: '100%' }}>
              <Grid item
                xs={12}
                md={6}
                lg={4}
                sx={{ border: '1px solid #d6d6d6', }}
              >
                <img src={`${process.env.REACT_APP_URL}${state.image}`} alt='Image' />
              </Grid>
              <Grid item
                xs={12}
                md={6}
                lg={8}
                sx={{ border: '1px solid #d6d6d6', }}
              >
                <Box sx={{ p: 2 }}>
                  <Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='h4' fontWeight="bold">
                        Title:
                        <Typography sx={{ display: 'inline', ml: 1 }} variant='h5'>
                          {state.title}
                        </Typography>
                      </Typography>
                      <Box>
                        <Button variant='outlined' sx={{ mr: 1 }} endIcon={<Edit />}
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={handleDelete}
                          variant='contained' className='bg-[#CC2200]'
                          endIcon={
                            <DeleteForever />
                          }
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant='h4' fontWeight="bold">
                        Description:
                        <Typography sx={{ display: 'inline', ml: 2, }}>
                          {state.description}
                        </Typography>
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </StyledCard>
        }
      </StyledRoot>
    </Page>
  )
}

export default ViewSinglePost
