import { Box, Button, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import Page from '../../../../../components/page'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { deleteCompetition } from '../../../../../store/actions/competetionActions'
import { useSnackbar } from 'notistack'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const StyledRoot = styled(Box)(({theme})=>({
    minHeight:'100vh',
    padding:theme.spacing(4),
    marginTop:theme.spacing(5)
}))
const SingleCompetetion = () => {
    const {state} = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const handleDelete = () => {
        confirmAlert({
            title: 'Delete?',
            message: 'Are you sure to want to delete ?',
            buttons:[
              {
                label: 'Yes',
                onClick: ()=>{
                    dispatch(deleteCompetition(state.id)).then((result) => {
                        enqueueSnackbar(result.data.message, {
                            variant:'success'
                        })
                        navigate('/admin/competetions')
                    }).catch((err) => {
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
    const handleEdit = () => {
        navigate(`/admin/edit-competetion`, {state:state})
    }
  return (
    <Page title="Competition">
        <StyledRoot>
        <Grid container sx={{height:'70vh', mb:5}} spacing={4}>
<Grid item xs={12} md={4} lg={4}>
    <Box 
    sx={{
        border:'1px solid black',
        height:'100%'
    }}>
        <img src={`${process.env.REACT_APP_URL}${state.images[0].image}`} alt="Competition Image"
        style={{
            height:'100%',
            // width:'100%',
            // objectFit:"cover",
        }}
        />
    </Box>
</Grid>
<Grid item xs={12} md={8} lg={8}>
    <Box sx={{px:5, PY:1}}>
        <Typography variant='h3' fontWeight="bold"
        sx={{
            '&:hover': {
                textDecoration:'underline',
                cursor:'pointer'
            }
        }}
        >{state.title}</Typography>
        <Typography>
           {state.description}
        </Typography>
        <Box sx={{mt:1, mb:2}}>
        <mark 
        style={{ 
            color: '#fff', 
            background: '#000', 
            padding: '3px 5px', 
            fontSize:"10px"}}>EDITTION#1</mark>
              <mark 
        style={{ 
            color: '#000', 
            background: '#e2e2e2', 
            padding: '3px 5px',
            marginLeft:'5px', 
            fontSize:"10px"}}>IDEAS COMPETETION</mark>
            </Box>
            <Typography sx={{fontSize:'15px', color:'#878787'}}>
                Prize
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>{state.prize?.total_prize || ''}</Typography>
            </Typography>
            <Typography sx={{fontSize:'15px', color:'#878787'}}>
                1st Prize
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>{state.prize?.first_prize}</Typography>
            </Typography>
            <Typography sx={{fontSize:'15px', color:'#878787'}}>
               2nd Prize
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>{state.prize?.second_prize}</Typography>
            </Typography>
            <Typography sx={{fontSize:'15px', color:'#878787'}}>
                3rd Prize
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>{state.prize?.third_prize}</Typography>
            </Typography>
            <Typography sx={{fontSize:'15px', color:'#878787'}}>
                Eligibilty
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>Open to all</Typography>
            </Typography>
            <Typography sx={{fontSize:'15px', color:'#878787', mt:3}}>
                Final Registration Deadline
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>{state.date} November 2023</Typography>
            </Typography>
            <Box sx={{mt:4, display:'flex', alignItems:'center'}}>
                <Button
                onClick={handleDelete}
                className='bg-[#c70000]'
                variant='contained'
                endIcon={<Delete />}
                sx={{
                    borderRadius:'0px',
                    py:1.5,
                    textTransform:'none',
                    '&:hover' : {
                        background:'#c70000'
                    }
                }}
                >
                  Delete 
                </Button>
                <Button variant='outlined'
                onClick={handleEdit}
                endIcon={<Edit/>}
                sx={{
                    ml:2,
                    borderRadius:'0px',
                    borderColor:'#000',
                    color:'#000',
                    py:1.5,
                    textTransform:'none',
                }}
                >
                    Edit
                </Button>
            </Box>
    </Box>
</Grid>
</Grid> 
        </StyledRoot>
    </Page>
  )
}

export default SingleCompetetion
