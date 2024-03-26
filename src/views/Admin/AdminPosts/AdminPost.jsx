import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import Page from "../../../components/page";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { deletePost, getAllPosts } from "../../../store/actions/userActions";
import { ThreeDots } from "react-loader-spinner";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSnackbar } from "notistack";
import { truncateString } from "../../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
const StyledRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4),
}));
const AdminPost = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [delLoading, setDelLoading] = React.useState(false);
  const [postId, setPostId] = React.useState(-1);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const getPosts = () => {
    setLoading(true);
    dispatch(getAllPosts())
      .then((result) => {
        setLoading(false);
        setPosts(result.data.payload);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getPosts();
  }, []);
  const handleDelete = (id) => {
    setDelLoading(true);
    setPostId(id);
    confirmAlert({
      title: "Delete?",
      message: "Are you sure to want to delete this post ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deletePost(id))
              .then((result) => {
                setDelLoading(false);
                enqueueSnackbar(result.data.message, {
                  variant: "success",
                });
                getPosts();
              })
              .catch((err) => {
                setDelLoading(false);
                console.log(err);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <Page title="Posts Manager">
      <StyledRoot>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            fontFamily="Bebas Neue"
            letterSpacing="1px"
          >
            All Posts
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/add-post")}
            sx={{ borderRadius: 0 }}
            endIcon={<AddCircleOutlineIcon />}
          >
            Add New Post
          </Button>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Grid container sx={{ mt: 4 }} spacing={3}>
          {loading ? (
            <Box>
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
            </Box>
          ) : (
            posts.map((val, ind) => {
              // console.log(val)
              return (
                <Grid item xs={12} md={6} lg={6}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        style={{ height: 200 }}
                        image={`${process.env.REACT_APP_URL}${val.image}`}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {val.name}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "22px" }}
                          >
                            {val.title}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 400, fontSize: "19px" }}
                          >
                            {truncateString(val.description, 30)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          sx={{ mr: 2 }}
                          onClick={() => navigate(`/admin/edit-post/${val.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          variant={delLoading ? "disabled" : "outlined"}
                          onClick={() => handleDelete(val.id)}
                          endIcon={<DeleteIcon color="error" />}
                        >
                          {delLoading && postId === val.id
                            ? "Please Wait..."
                            : "Delete"}
                        </Button>
                      </Box>
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

export default AdminPost;
