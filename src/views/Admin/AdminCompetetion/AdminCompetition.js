import { Box, Button, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import Page from '../../../components/page'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCompetitions } from '../../../store/actions/competetionActions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
const StyledRoot = styled(Box)(({theme})=>({
    minHeight:'100vh',
    padding:theme.spacing(4)
}))
const AdminCompetition = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = React.useState([])
    const getCompetitiions = () => {
        dispatch(getAllCompetitions()).then((result) => {
            setData(result.data.payload)
        }).catch((err) => {
            console.log(err)
        });
    }
    React.useEffect(()=> {
        getCompetitiions()
    },[])
    const handleClickTypo = (val) => {
        navigate(`/admin/competetion`, {state:val})
    }
  return (
    <Page title="Manae Competetions">
        <StyledRoot>
        <Box sx={{display:'flex', 
        justifyContent:'space-between', 
        alignItems:'center',
        mb:3
        }}>
            <Typography variant='h3' fontWeight="bold" fontFamily="Bebas Neue" letterSpacing="1px">
                All Competetions
            </Typography>
            <Button variant='outlined'
            sx={{borderRadius:0}}
            component={Link}
            to="/admin/add-competetion"
            endIcon={
                <AddCircleOutlineIcon />
            }
            >
                Add New Competetion
            </Button>
            </Box>
            {
                data.map((val)=>{
                    // console.log(val.images[0])
                    return(
                        <Grid container sx={{height:'70vh', mb:5}} spacing={4}>
<Grid item xs={12} md={4} lg={4}>
    <Box 
    sx={{
        border:'1px solid black',
        height:'100%'
    }}>
        <img src={`${process.env.REACT_APP_URL}${val.images[0].image}`} alt="Competition Image"
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
        onClick={()=>handleClickTypo(val)}
        sx={{
            '&:hover': {
                textDecoration:'underline',
                cursor:'pointer'
            }
        }}
        >{val.title}</Typography>
        <Typography>
           {val.description}
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
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>Monetary Award</Typography>
            </Typography>
            <Typography sx={{fontSize:'15px', color:'#878787'}}>
                Eligibilty
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>Open to all</Typography>
            </Typography>
            <Typography sx={{fontSize:'15px', color:'#878787', mt:3}}>
                Final Registration Deadline
                <Typography sx={{display:'inline', ml:1, color:'#000', fontSize:'15px'}}>{val.date} November 2023</Typography>
            </Typography>
            <Box sx={{mt:4, display:'flex', alignItems:'center'}}>
                <Button
                className='bg-black'
                variant='contained'
                endIcon={
                    <ArrowForwardIcon />
                }
                sx={{
                    borderRadius:'0px',
                    py:1.5,
                    textTransform:'none'
                }}
                >
                   Fint Out More 
                </Button>
                <Typography sx={{ml:2, cursor:'pointer',
                '&:hover': {
                    textDecoration:'underline'
                }
            }}>
                    Send reminders
                        <EmailIcon sx={{color:'#878787', fontSize:'18px', ml:0.5}} />
                </Typography>

                <Typography sx={{ml:2, cursor:'pointer',
                '&:hover': {
                    textDecoration:'underline'
                }
            }}>
                    Download brief
                        <CloudDownloadIcon sx={{color:'#878787', fontSize:'18px', ml:0.5}} />
                </Typography>
            </Box>
    </Box>
</Grid>
</Grid> 
                    )
                })
            }
        </StyledRoot>
    </Page>
  )
}

export default AdminCompetition

 