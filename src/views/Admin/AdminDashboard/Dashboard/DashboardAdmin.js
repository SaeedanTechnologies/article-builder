import React from 'react'
import Page from '../../../../components/page'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { StyledBox, StyledRoot } from './styles'
import BarChart from './components/BarChart'
import {data} from './components/Data'
import LineChartComp from './components/LineChartComp'
import PieChartComp from './components/PieChartComp'
import IosShareIcon from '@mui/icons-material/IosShare';
import Cardcomp from './components/Cardcomp'
import { useDispatch } from 'react-redux'
import { getAdminDashboardStats } from '../../../../store/actions/adminActions'
import PeopleIcon from '@mui/icons-material/People';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CommentIcon from '@mui/icons-material/Comment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ForumIcon from '@mui/icons-material/Forum';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
const DashboardAdmin = () => {
  const [stats, setStats] = React.useState([])
  const dispatch =  useDispatch()
  const [userData, setUserData] = React.useState({
    labels:data.map((data)=>data.year),
    datasets:[
      {label:'Users Gained', data: data.map((data)=> data.userGained), backgroundColor:["#3E51D7"]}
    ]
  })
  const [lineData, setlineData] = React.useState({
    labels:data.map((data)=>data.year),
    datasets:[
      {label:'Users Gained', data: data.map((data)=> data.userGained), 
      borderColor: "#3E51D7", // Color of the line
      fill: true, // Fill the area below the line
      backgroundColor: "rgba(62, 81, 215, 0.5)",
    }
    ]
  })

  const [pieData, setPieData] = React.useState({
    labels:data.map((data)=>data.year),
    datasets:[
      {label:'Users Gained', data: data.map((data)=> data.userGained), 
      backgroundColor: ["#3E51D7", "#FFA500", "#FFFF00", "#008000", "#4B0082", "#FF0000", "#800080", "#00CED1", "#800000", "#8A2BE2", "#B22222", "#32CD32", "#9370DB", "#D2691E"],
    }
    ]
  })

  const getAdminStats = () => {
    dispatch(getAdminDashboardStats()).then((result) => {
      setStats(result.data.payload)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(()=> {
      getAdminStats()
  }, [])
  const cardData = [
    { main: 'rgb(248, 220, 224)', av: "#FB5581", total: stats.total_users, title: "Total Users", Avatar: <PeopleIcon /> },
    { main: '#FFF4DE', av: "#F1A28C", total: stats.total_Posts, title: "Total Posts", Avatar: <DynamicFeedIcon /> },
    { main: '#F5E7FE', av: "#C082FE", total: stats.total_Comments, title: "Total Comments", Avatar: <CommentIcon /> },
    { main: '#DEFBE9', av: "#45C95A", total: stats.total_Online_Users, title: "Users Online", Avatar: <CheckCircleOutlineIcon /> },
    { main: '#FFF4DE', av: "#F1A28C", total: stats.total_Messages, title: "Total Messages", Avatar: <ForumIcon /> },
    { main: 'rgb(248, 220, 224)', av: "#FB5581", total: stats.total_Videos, title: "Total Videos", Avatar: <OndemandVideoIcon /> },
    { main: '#DEFBE9', av: "#45C95A", total: stats.total_Projects, title: "Total Projects", Avatar: <AccountTreeIcon /> },
    { main: '#FFF4DE', av: "#F1A28C", total: stats.total_Pictures, title: "Total Photos", Avatar: <PhotoSizeSelectActualIcon /> },
    { main: '#F5E7FE', av: "#C082FE", total: stats.total_Post_Likes, title: "Total Posts Likes", Avatar: <ThumbUpIcon /> }
]
  return (
    <Page
    title="Dashboard"
    >
      <StyledRoot>
          <Grid container spacing={2}>
            <Grid item
            xs={12}
            md={8}
            lg={8}
            >
              <StyledBox elevation='none'>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                  <Box>
                <Typography sx={{fontWeight:'bold', fontSize:'1.25rem'}}>
                  Today's Sales
                </Typography>
                <Typography sx={{color:'#b7b7b7', ml:0.5}}>
                  Sales Summary 
                </Typography>
                  </Box>
                  <Button variant='outlined' sx={{height:'35px'}} endIcon={<IosShareIcon />}>
                    Export 
                  </Button>
                </Box>
                <Divider />
                <Grid container spacing={2}>
                  {cardData.map((val)=> {
                    return(
                      <Grid item xs={12} md={6} lg={3}>
                    <Cardcomp main={val.main} av={val.av} total={val.total} title={val.title} Avatar={val.Avatar}  />
                  </Grid>
                    )
                  })}
                 
                </Grid>
              </StyledBox>
            </Grid>
            <Grid item
            xs={12}
            md={4}
            lg={4}
            >
               <StyledBox elevation='none' >
               <Typography sx={{fontWeight:'bold', fontSize:'1.25rem', mb:2}}>
                  Visitor's Insights
                </Typography>
                {/* <Box> */}
                  <LineChartComp chartData={lineData} />
                {/* </Box> */}
              </StyledBox>
            </Grid>
            <Grid
          item
          xs={12}
          md={6}
          lg={6}
          >
                 <StyledBox elevation='none'>
                 <Typography sx={{fontWeight:'bold', fontSize:'1.25rem'}}>
                  Total Revenue
                </Typography>
                 <BarChart chartData={userData}/>
                  
              </StyledBox>
          </Grid>
          <Grid
          item
          xs={12}
          md={3}
          lg={3}
          >
                 <StyledBox elevation='none'>
                 <Typography sx={{fontWeight:'bold', fontSize:'1.05rem'}}>
                  Customer Satisfaction
                </Typography>
                  <PieChartComp chartData={pieData} />
              </StyledBox>
          </Grid>
          <Grid
          item
          xs={12}
          md={3}
          lg={3}
          >
                 <StyledBox elevation='none'>
              This is grid 5
              </StyledBox>
          </Grid>
          <Grid
          item
          xs={12}
          md={6}
          lg={6}
          >
                 <StyledBox elevation='none'>
              This is grid 3
              </StyledBox>
          </Grid>
          <Grid
          item
          xs={12}
          md={3}
          lg={3}
          >
                 <StyledBox elevation='none'>
              This is grid 4
              </StyledBox>
          </Grid>
          <Grid
          item
          xs={12}
          md={3}
          lg={3}
          >
                 <StyledBox elevation='none'>
              This is grid 5
              </StyledBox>
          </Grid>
          </Grid>
       
      </StyledRoot>
    </Page>
  )
}

export default DashboardAdmin
