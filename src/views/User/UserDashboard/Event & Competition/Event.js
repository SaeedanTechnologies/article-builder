import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, styled } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useDispatch } from 'react-redux';
import { getAllEvents } from '../../../../store/actions/userActions';
import Page from '../../../../components/page';
const StyledRoot = styled(Box)(({theme})=> ({
    padding:theme.spacing(15,5)
}))

const Event = () => {
    const [data, setData] = React.useState([])
    const dispatch = useDispatch()
    const getEvents = () => {
        dispatch(getAllEvents()).then((result) => {
          setData(result.data.payload)
        }).catch((err) => {
          console.log(err)
        });
    }
    React.useEffect(()=> {
      getEvents()
    }, [])
    return (
        <Page title="User Events">
        <StyledRoot>
        <Grid container spacing={3} >
        {
         data.map((val)=> {
           return(
         <Grid item xs={12} md={6} lg={6}>
         <Card>
       <CardActionArea>
         <CardMedia
           component="img"
           style={{height: 200}}
           image={`${process.env.REACT_APP_URL}${val.image}`}
           alt="green iguana"
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
           {val.name}
           </Typography>
           <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
           <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'start', gap: 1}}>
          <CalendarTodayIcon/>
          <Typography>{val.date}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'end',  gap: 1}}>
 <LocationOnIcon/>
 <Typography>{val.location} -</Typography>
 <Typography  sx={{color: 'blue'}}>Show in Map</Typography>
          </Box>
           </Box>
           <Button style={{backgroundColor: '#B2BEB5', color: 'white',borderRadius: '18px', marginTop: "12px" }} fullWidth>Join Now</Button>
          
         
         </CardContent>
       </CardActionArea>
     </Card>
         </Grid>
           )
         })
        }
 
       </Grid>
        </StyledRoot>
        </Page>
    );
};

export default Event;