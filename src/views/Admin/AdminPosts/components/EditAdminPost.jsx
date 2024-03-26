import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Input,
  Grid,
  Stack,
  InputAdornment,
  Divider,
  useTheme,
  styled,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Page from "../../../../components/page";
import { useDispatch } from "react-redux";
import { editPost, getPost } from "../../../../store/actions/userActions";
import { ThreeDots } from "react-loader-spinner";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  marginTop: theme.spacing(4),
}));
const initialValues = {
  id: -1,
  created_at: "",
  updated_a: "",
  title: "",
  description: "",
  image: "",
  link: "",
  user_id: "",
  comments: [],
  likes: [],
};
const EditAdminPost = () => {
  const [post, setPost] = useState(initialValues);
  const { id } = useParams();
  const imageRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPost({ ...post, image: file });
  };

  const handleImageRef = () => {
    imageRef.current.click();
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(editPost(post, post.id))
      .then((result) => {
        setLoading(false);
        enqueueSnackbar(result.data.message, {
          variant: "success",
        });
        navigate("/admin/posts");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setSelectedImage(null);
    setPost(initialValues);
  };

  const getSinglePost = () => {
    setLoading(true);
    dispatch(getPost(id))
      .then((result) => {
        setLoading(false);
        console.log(result.data.payload);
        setPost(result.data.payload);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  console.log("post=======", post);

  return (
    <Page title="Update Post">
      <StyledRoot>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container>
            <Card variant="outlined" style={{ borderRadius: "12px" }}>
              <CardContent style={{ background: "white" }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Stack
                        gap={2}
                        sx={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            backgroundImage: selectedImage
                              ? `url(${URL.createObjectURL(selectedImage)})`
                              : `url(${process.env.REACT_APP_URL}${post.image})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                          }}
                        ></div>
                        <input
                          ref={imageRef}
                          name="image"
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleImageChange}
                          style={{
                            width: "100%",
                            height: "100%",
                            opacity: 0,
                            cursor: "pointer",
                          }}
                        />
                        <Button
                          onClick={handleImageRef}
                          variant="contained"
                          color="primary"
                          style={{
                            backgroundColor: theme.palette.primary.main,
                            width: "40%",
                          }}
                        >
                          Edit Image
                        </Button>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        id="input-with-icon-textfield"
                        style={{ width: "85%", marginTop: "50px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />

                      <div
                        style={{
                          width: "85%",
                          marginTop: "50px",
                          maxHeight: "4em",
                          overflowY: "auto",
                        }}
                      >
                        <TextField
                          required
                          name="description"
                          value={post.description}
                          onChange={handleChange}
                          id="input-with-icon-textfield"
                          style={{
                            width: "100%",
                            height: "100%",
                            padding: "0",
                            border: "0",
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                          multiline
                        />
                      </div>
                      <br />
                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          marginTop: "20px",
                          backgroundColor: "red",
                          color: "white",
                        }}
                      >
                        {t("update")}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Container>
        </div>
      </StyledRoot>
      {loading && (
        <Dialog open={true} fullWidth>
          <DialogTitle>Uploading please wait......</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#3E50CE"
                ariaLabel="three-dots-loading"
                wrapperClassName=""
                visible={true}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Page>
  );
};

export default EditAdminPost;
