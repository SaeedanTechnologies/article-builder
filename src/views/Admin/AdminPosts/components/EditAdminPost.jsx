import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Input,
  Grid,
  InputAdornment,
  Divider,
  styled,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Page from "../../../../components/page";
import { useDispatch } from "react-redux";
import { addPost, getPost } from "../../../../store/actions/userActions";
import { ThreeDots } from "react-loader-spinner";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  marginTop: theme.spacing(4),
}));
const initialValues = {
  title: "",
  description: "",
  link: `${process.env.REACT_APP_URL}api/posts`,
};
const EditAdminPost = () => {
  const [post, setPost] = useState({
    image: null,
    title: "",
    description: "",
  });
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formValues, setFormValues] = React.useState(initialValues);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("link", formValues.link);
    dispatch(addPost(formData))
      .then((result) => {
        setLoading(false);
        enqueueSnackbar(result.data.message, {
          variant: "success",
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setSelectedImage(null);
    setFormValues(initialValues);
  };

  const getSinglePost = () => {
    setLoading(true);
    dispatch(getPost(id))
      .then((result) => {
        setLoading(false);
        console.log(result.data.payload);
        // setPost(result.data.payload);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  return (
    <Page title="Create Pin">
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      {selectedImage ? (
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                          style={{
                            marginLeft: "110px",
                            width: "320px",
                            height: "90%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#e1e1e1",
                            marginLeft: "110px",
                            width: "320px",
                            height: "90%",
                            paddingTop: "100%",
                            position: "relative",
                          }}
                        >
                          <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              opacity: 0,
                              cursor: "pointer",
                            }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            Edit Image
                          </Button>
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        name="title"
                        value={formValues.title}
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
                          value={formValues.description}
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
                        {t("createPin")}
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
                wrapperStyle={{}}
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
