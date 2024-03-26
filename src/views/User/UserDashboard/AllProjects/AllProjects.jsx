import { Box, Grid, styled } from "@mui/material";
import React from "react";
import Page from "../../../../components/page";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../../../store/actions/userActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  marginTop: theme.spacing(4),
}));
const AllProjects = () => {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProjects = () => {
    setLoading(true);
    dispatch(getAllProjects())
      .then((result) => {
        setLoading(false);
        setProjects(result.data.payload);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  React.useEffect(() => {
    getProjects();
  }, []);

  const handleProjectClick = (data) => {
    // console.log(data)
    navigate("/user/view-post", { state: data });
  };
  return (
    <Page title="All Projects">
      <StyledRoot>
        <Grid container spacing={2}>
          {loading ? (
            <ThreeDots
              height="100"
              width="100"
              radius="9"
              color="#3e50ce"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            projects.map((val) => {
              const formattedDate = moment(val.created_at).format(
                "MMMM D, YYYY"
              );
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        background: "#e2e2e2",
                      },
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={val.title}
                      subheader={formattedDate}
                    />
                    <CardMedia
                      onClick={() => handleProjectClick(val)}
                      component="img"
                      style={{ height: "400px" }}
                      maxHeight="194"
                      image={`${val.image[0].image}`}
                      alt="Image"
                    />
                    <CardContent
                      onClick={() => handleProjectClick(val)}
                      style={{
                        height: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {val.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </StyledRoot>
    </Page>
  );
};

export default AllProjects;
