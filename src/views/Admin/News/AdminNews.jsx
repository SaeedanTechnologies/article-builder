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
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import Page from "../../../components/page";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddNews from "./components/AddNews";
import { useDispatch } from "react-redux";
import { getAllNews, deleteNews } from "../../../store/actions/userActions";
import { ThreeDots } from "react-loader-spinner";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSnackbar } from "notistack";

import { Link, useNavigate } from "react-router-dom";
import { truncateString } from "../../../utils";

const StyledRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4),
}));
const AdminNews = () => {
  const [open, setOpen] = React.useState(false);
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [delLoading, setDelLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const getNews = () => {
    setLoading(true);
    dispatch(getAllNews())
      .then((result) => {
        setLoading(false);
        console.log("=========result data========", result.data.payload);
        setNews(result.data.payload);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getNews();
  }, []);
  const handleDelete = (id) => {
    setDelLoading(true);
    confirmAlert({
      title: "Delete?",
      message: "Are you sure to want to delete this news ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteNews(id))
              .then((result) => {
                setDelLoading(false);
                enqueueSnackbar(result.data.message, {
                  variant: "success",
                });
                getNews();
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

  const handleEdit = (data) => {
    navigate("/admin/edit-news", { state: data });
  };
  return (
    <Page title="Events Manager">
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
            All NEWS
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 0 }}
            endIcon={<AddCircleOutlineIcon />}
          >
            CREATE NEWS
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
            news.map((val, ind) => {
              // console.log(val);
              return (
                <Grid key={ind} item xs={12} md={6} lg={6}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        style={{ height: 200 }}
                        image={`${process.env.REACT_APP_URL}${val.banner_image}`}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {val.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: 1,
                            }}
                          >
                            <CalendarTodayIcon />
                            <Typography>
                              {truncateString(val.description, 50)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          sx={{ mr: 2 }}
                          onClick={() => handleEdit(val)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          variant={delLoading ? "disabled" : "outlined"}
                          onClick={() => handleDelete(val.id)}
                          endIcon={<DeleteIcon color="error" />}
                        >
                          {delLoading ? "Please Wait..." : "Delete"}
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
        <AddNews
          open={open}
          close={() => setOpen(false)}
          createSuccess={getNews}
        />
      </StyledRoot>
    </Page>
  );
};

export default AdminNews;
