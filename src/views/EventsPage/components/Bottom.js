import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../../store/actions/userActions";

const Bottom = (props) => {
  const { children, value, index, ...other } = props;
  const StyledRoot = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3, 12),
  }));
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const getEvents = () => {
    dispatch(getAllEvents())
      .then((result) => {
        setData(result.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getEvents();
  }, []);
  const theme = useTheme();
  return (
    <>
      {/* <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', paddingTop: '30px'}}>
      <Button style={{backgroundColor: '#3B318A',color:'white', borderRadius: '15px',  padding: '0 17px'}}>All Event</Button>
      <Button style={{backgroundColor: '#3B318A',color:'white', borderRadius: '15px',  padding: '0 17px'}}>This weak</Button>
      <Button style={{backgroundColor: '#3B318A',color:'white', borderRadius: '15px',  padding: '0 17px'}}>Select date</Button>
      <Button style={{backgroundColor: '#3B318A', color:'white', borderRadius: '15px',  padding: '0 17px'}}>Tomorrow</Button>
      
      </Box> */}
      <StyledRoot>
        {/* <TextField
          label="Search"
          variant="outlined"
          sx={{ width: "500px", mb: 2 }}
        />{" "} */}

        <Grid container spacing={3} py={3}>
          {data.map((val, ind) => {
            return (
              // <Grid item xs={12} md={6} lg={6}>
              //   <Card>
              //     <CardActionArea>
              //       <CardMedia
              //         component="img"
              //         style={{ height: 200 }}
              //         image={`${process.env.REACT_APP_URL}${val.image}`}
              //         alt="green iguana"
              //       />
              //       <CardContent>
              //         <Typography gutterBottom variant="h5" component="div">
              //           {val.name}
              //         </Typography>
              //         <Box
              //           sx={{
              //             display: "flex",
              //             alignItems: "center",
              //             justifyContent: "space-between",
              //           }}
              //         >
              //           <Box
              //             sx={{
              //               display: "flex",
              //               alignItems: "center",
              //               justifyContent: "start",
              //               gap: 1,
              //             }}
              //           >
              //             <CalendarTodayIcon />
              //             <Typography>{val.date}</Typography>
              //           </Box>
              //           <Box
              //             sx={{
              //               display: "flex",
              //               alignItems: "center",
              //               justifyContent: "end",
              //               gap: 1,
              //             }}
              //           >
              //             <LocationOnIcon />
              //             <Typography>{val.location} -</Typography>
              //             <Typography sx={{ color: "blue" }}>
              //               Show in Map
              //             </Typography>
              //           </Box>
              //         </Box>
              //         <Button
              //           style={{
              //             backgroundColor: "#B2BEB5",
              //             color: "white",
              //             borderRadius: "18px",
              //             marginTop: "12px",
              //           }}
              //           fullWidth
              //         >
              //           Join Now
              //         </Button>
              //       </CardContent>
              //     </CardActionArea>
              //   </Card>
              // </Grid>
              <Grid key={ind} item lg={4} md={6} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // textAlign: "start",
                    // alignItems: "start",
                    // boxShadow: "0px 8px 6px 0px rgba(128, 128, 128, 0.50)",
                    border: `1px solid ${theme.palette.custom.gray}`,
                    width: "100%",
                    overflow: "hidden",
                    // borderRadius: "16px",
                    height: "100%",
                    position: "relative",
                    pb: 5,
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL}${val.image}`}
                    style={{
                      width: "100%",
                      // height: "100%",
                      height: "50vh",
                      objectFit: "cover",
                    }}
                    alt="abc"
                  />
                  <Box
                    sx={{
                      padding: "15px",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "start",
                        textTransform: "none",
                      }}
                    >
                      {val.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        textAlign: "start",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 3,
                        textTransform: "none",
                      }}
                    >
                      {val.sub}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3,
                      }}
                    >
                      <Button
                        className="animated-button"
                        onClick={() => alert(val.sub)}
                        style={{
                          backgroundColor: "transparent",
                          // color: theme.palette.secondary.main,
                          color: theme.palette.custom.gray,
                          fontSize: "16px",
                          padding: "6px 10px",
                          fontWeight: 600,
                          border: `1px solid ${theme.palette.custom.gray}`,
                          textTransform: "none",
                        }}
                      >
                        Winning Projects
                      </Button>

                      <Button
                        className="animated-button"
                        onClick={() => alert(val.sub)}
                        style={{
                          backgroundColor: "transparent",
                          // color: theme.palette.secondary.main,
                          color: theme.palette.custom.gray,
                          fontSize: "16px",
                          padding: "10px",
                          fontWeight: 600,
                          border: `1px solid ${theme.palette.custom.gray}`,
                          textTransform: "none",
                        }}
                      >
                        Official Book
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </StyledRoot>
    </>
  );
};

export default Bottom;
