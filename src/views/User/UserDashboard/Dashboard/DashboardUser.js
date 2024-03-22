import React from 'react';
import { StyledBox, StyledRoot } from './Style';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { datas } from './Components/Data';
import ProfileChart from './Components/ProfileChart';
import InsightsIcon from '@mui/icons-material/Insights';
import PostView from './Components/PostView';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MessageIcon from '@mui/icons-material/Message';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Page from '../../../../components/page'
// import { useSelector } from 'react-redux';

const DashboardUser = () => {
    // This is for Profile View
    // const selector = useSelector(state => state.user)

    const [profileV, setProfileV] = React.useState({
        labels: datas.map((datas) => datas.ProfileView),
        datasets: [
            {
                label: 'Profile Views', data: datas.map((datas) => datas.ProfileView),
                borderColor: "rgba(77, 49, 122, 0.7)", // Color of the line
                fill: true, // Fill the area below the line
                backgroundColor: "rgba(23,33, 222,0.6)",
            }
        ]
    });
    // This is for Post View
    const [postV, setPostV] = React.useState({
        labels: datas.map((datas) => datas.PostView),
        datasets: [
            {
                label: "Post View", data: datas.map((datas) => datas.PostView),
                borderColor: "rgba(77, 49, 122, 0.7)",
                fill: true,
                backgroundColor: "#62eb3f"
            }
        ]
    });

    return (
        <Page  title="Dashboard">
            <StyledRoot>
                <Grid container spacing={2}>
                    <Grid item
                        xs={12}
                        md={8}
                        lg={12}>
                        <StyledBox elevation={false} sx={{ height: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: '45px' }}>
                            <Grid container spacing={6}>
                                <Grid item lg={3}>
                                    <StyledBox sx={{ height: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <MessageIcon sx={{ fontSize: 48, backgroundColor: '#ee05fa', color: 'white', padding: '8px', borderRadius: '7px',  }} />
                                        <Typography sx={{ mt: '30px', fontWeight: 'bold', color: 'gray' }}>Total Comments</Typography>
                                        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>155</Typography>
                                        <Typography sx={{ color: '#ee05fa', fontWeight: 'bold' }}>Growth rate: 20%</Typography>
                                    </StyledBox>

                                </Grid>
                                <Grid item lg={3}>

                                    <StyledBox sx={{ height: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <VisibilityIcon sx={{ fontSize: 48, backgroundColor: '#05fa22', color: 'white', padding: '8px', borderRadius: '7px' }} />
                                        <Typography sx={{ mt: '30px', fontWeight: 'bold', color: 'gray' }}>Total Video's View</Typography>
                                        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>660</Typography>
                                        <Typography sx={{ color: '#05fa22', fontWeight: 'bold' }}>Growth rate: 30%</Typography>
                                    </StyledBox>

                                </Grid>
                                <Grid item lg={3}>

                                    <StyledBox sx={{ height: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <FavoriteIcon sx={{ fontSize: 48, backgroundColor: '#fcb900', color: 'red', padding: '8px', borderRadius: '7px'}} />
                                        <Typography sx={{ mt: '30px', fontWeight: 'bold', color: 'gray' }}>Total likes</Typography>
                                        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>100</Typography>
                                        <Typography sx={{ color: '#fcb900', fontWeight: 'bold' }}>Growth rate: 40%</Typography>
                                    </StyledBox>

                                </Grid>
                                <Grid item lg={3}>

                                    <StyledBox sx={{ height: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <VisibilityIcon sx={{
                                            fontSize: 48, backgroundColor: '#474acc',
                                            color: 'white', padding: '8px', borderRadius: '7px'
                                        }} />
                                        <Typography sx={{ mt: '30px', fontWeight: 'bold', color: 'gray' }}>Total Project Views</Typography>
                                        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>305</Typography>
                                        <Typography sx={{ color: '#474acc', fontWeight: 'bold' }}>Growth rate: 50%</Typography>
                                    </StyledBox>

                                </Grid>
                            </Grid>
                        </StyledBox>

                    </Grid>
                    <Grid item
                        xs={12}
                        md={8}
                        lg={7}>
                        <StyledBox elevation={false} sx={{ height: '62vh' }}>

                            <Box sx={{
                                display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center',

                            }}>

                                <InsightsIcon />


                                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', }}>
                                    Profile Views
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', }}>
                                    June,2020
                                </Typography>

                            </Box>


                            <ProfileChart chartData={profileV} />


                            <Typography sx={{ color: 'gray' }}>Total Profile Views</Typography>
                            <Typography sx={{ fontWeight: 600, fontSize: '25px' }}>78,88,999</Typography>


                        </StyledBox>


                    </Grid>
                    <Grid item
                        xs={12}
                        md={8}
                        lg={5}>
                        <StyledBox elevation={false} sx={{ height: '62vh' }}>
                            <Box sx={{
                                display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center',

                            }}>

                                <RateReviewIcon />


                                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', }}>
                                    Post Views
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', }}>
                                    June,2020
                                </Typography>

                            </Box>

                            <PostView chartData={postV} />
                            <Typography sx={{ color: 'gray' }}>Total Post Views</Typography>
                            <Typography sx={{ fontWeight: 600, fontSize: '25px' }}>78,88,999</Typography>
                        </StyledBox>

                    </Grid>

                </Grid >


            </StyledRoot >
        </Page>

    );
};

export default DashboardUser;