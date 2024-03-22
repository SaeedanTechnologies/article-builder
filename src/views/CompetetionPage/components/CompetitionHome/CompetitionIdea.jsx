import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import Page from "../../../../components/page";
import "./styles.css";
import SideBar from "./components/SideBar";

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));
const StyledBottom = styled(Container)(({ theme }) => ({
  padding: theme.spacing(7),
}));

const CompetitionIdea = (props) => {
  const [open, setopen] = React.useState(false);
  const theme = useTheme();

  const { children, value, index, ...other } = props;
  const data = [
    {
      id: 0,
      src: "/assets/images/Discusion.jpg",
      title: `Group Discussion`,
      sub: "Take a seat and Play smartly",
      date: 1,
    },
    {
      id: 1,
      src: "/assets/images/ClassDiscussion.jpg",
      title: `Class Converationr`,
      sub: "Coversation with mates",
      date: 2,
    },
    {
      id: 2,
      src: "/assets/images/Brain.jpg",
      title: `Ideas Invention`,
      sub: "Idea Clicking in Brain",
      date: 3,
    },
  ];
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Page title="Competetion Homepage">
        <StyledBottom>
          <Grid container spacing={5}>
            {" "}
            {data.slice(0, 3).map((val, ind) => (
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
                    src={val.src}
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
                      {val.title}
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
                        onClick={() => alert(val)}
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
                        onClick={() => alert(val)}
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
            ))}
          </Grid>
        </StyledBottom>
        <SideBar open={open} close={() => setopen(false)} />
        <StyledRoot></StyledRoot>
      </Page>
    </div>
  );
};

export default CompetitionIdea;
