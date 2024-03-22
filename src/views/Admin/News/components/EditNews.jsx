import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import Page from "../../../../components/page";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  InputAdornment,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  editNews,
  updateNewsImage,
} from "../../../../store/actions/userActions";

import { useSnackbar } from "notistack";
import Loader from "../../../../components/Loader";
import { ColorRing } from "react-loader-spinner";
const StyledRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4),
}));
const EditNews = () => {
  React.useEffect(() => {
    setFormValues({
      ...formValues,
      title: state.title,
      description: state.description,
      author: state.author,
      banner_image: state.banner_image,
      images: state.images,
    });
    // setSelectedImage()
  }, []);
  const initialValues = {
    title: "",
    description: "",
    author: "",
    banner_image: {},
    images: [],
  };
  const { state } = useLocation();
  // console.log("state Id=========", state.id);
  const [formValues, setFormValues] = React.useState(initialValues);
  const singleImageRef = useRef(null);
  const [imageIndex, setImageIndex] = React.useState(-1);
  const [bannerImage, setBannerImage] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  console.log("formValues =========", formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBannerImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormValues({ ...formValues, [name]: file });
    setBannerImage(file);
  };

  const handleMultipleImagesChange = (e) => {
    const { name } = e.target;
    const files = e.target.files;
    // console.log("====files======", files);
    let filesArray = [];
    for (let key in files) {
      if (!isNaN(key) && files[key] instanceof File) {
        filesArray.push(files[key]);
      }
    }
    // console.log("====filesArray======", filesArray);
    setFormValues({ ...formValues, [name]: filesArray });
  };

  const deleteImage = (index) => {
    const imagesArray = [...formValues.images];
    imagesArray.splice(index, 1);
    // console.log("=======imagesArray======", imagesArray);
    setFormValues({ ...formValues, images: imagesArray });
  };

  const removeBannerImage = () => {
    console.log("in removeBanner");
    setFormValues({ ...formValues, banner_image: "" });
  };

  // console.log("banner Image", bannerImage);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("author", formValues.author);
    formData.append("banner_image", formValues.banner_image);

    formValues.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    dispatch(editNews(formData, state.id))
      .then((result) => {
        setLoading(false);
        enqueueSnackbar(result.data.message, {
          variant: "success",
        });
        navigate("/admin/news");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleImagesClick = (index) => {
    console.log("index in ref click ", index);
    singleImageRef?.current?.click();
  };

  const handleImageChange = (event, index) => {
    console.log("index======", index);
    const singleImage = event.target.files[0];
    setImageIndex(index);
    let images = formValues.images;
    let imageId = images[index].id;

    const formData = new FormData();
    formData.append("image", singleImage);
    setLoading(true);
    dispatch(updateNewsImage(formData, imageId))
      .then((result) => {
        // console.log("result data in success", result);
        setLoading(false);
        let updateImages = formValues.images;
        updateImages[index] = result.data.payload;

        setFormValues((prevState) => {
          const updatedImages = [...prevState.images];
          updatedImages[index] = result.data.payload;
          return { ...prevState, images: updatedImages };
        });
        setImageIndex(-1);
        event.target.value = null;
        enqueueSnackbar(result.data.message, {
          variant: "success",
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // console.log("imageIndex=====", imageIndex);
  return (
    <Page title="Edit New">
      <StyledRoot>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Update News
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              height: "40vh",
              border: "1px dashed grey",
              position: "relative",
              marginTop: 2,
            }}
          >
            {formValues.banner_image && (
              <>
                <IconButton
                  onClick={removeBannerImage}
                  sx={{
                    width: "auto",
                    position: "absolute",
                    top: -10,
                    zIndex: 20,
                    right: -10,
                    padding: "5px",
                    borderRadius: "50%",
                    height: "auto",
                    "&.MuiIconButton-root": {
                      backgroundColor: "#ff0000",
                    },
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  />
                </IconButton>
                <div
                  style={{
                    backgroundImage: bannerImage
                      ? `url(${URL.createObjectURL(formValues.banner_image)}`
                      : `url(${process.env.REACT_APP_URL}${formValues.banner_image}`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                  }}
                ></div>
              </>
            )}
          </Box>
          <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
            <input
              type="file"
              name="banner_image"
              accept="image/*"
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleBannerImageChange}
            />
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <Button variant="outlined" component="span">
                Update Banner Image
              </Button>
            </Box>
          </label>
          <Box
            sx={{
              minHeight: "40vh",
              height: "auto",
              border: "1px dashed grey",
              position: "relative",
            }}
          >
            <Grid container spacing={2} sx={{ position: "relative" }}>
              {formValues.images &&
                formValues?.images?.map((image, IndexOfImage) => {
                  return (
                    <Grid key={IndexOfImage} item xs={3}>
                      <Box
                        key={IndexOfImage}
                        sx={{
                          height: "30vh",
                          position: "relative",
                          borderRadius: "10px",
                        }}
                      >
                        <IconButton
                          onClick={() => deleteImage(IndexOfImage)}
                          sx={{
                            position: "absolute",
                            borderRadius: "50%",
                            top: -10,
                            right: -7,
                            zIndex: 20,
                            height: "19px",
                            width: "19px",
                            "&.MuiIconButton-root": {
                              backgroundColor: "#ff0000",
                            },
                          }}
                        >
                          <CloseIcon
                            sx={{
                              fontSize: "14px",

                              color: "#fff",
                              cursor: "pointer",
                            }}
                          />
                        </IconButton>

                        <div
                          key={IndexOfImage}
                          style={{
                            backgroundImage:
                              image instanceof File
                                ? `url(${URL.createObjectURL(image)}`
                                : `url(${process.env.REACT_APP_URL}${image.image}`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                          }}
                          onClick={() => handleImagesClick(IndexOfImage)}
                        >
                          <input
                            type="file"
                            style={{ display: "none" }}
                            ref={singleImageRef}
                            onChange={(event) =>
                              handleImageChange(event, IndexOfImage)
                            }
                            multiple
                          />
                          {loading && imageIndex === IndexOfImage && (
                            <Stack
                              alignItems={"center"}
                              justifyContent={"center"}
                              height="100%"
                            >
                              <Loader />
                            </Stack>
                          )}
                        </div>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
          <label htmlFor="multiple-upload" style={{ cursor: "pointer" }}>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              id="multiple-upload"
              style={{ display: "none" }}
              x
              onChange={handleMultipleImagesChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 4,
              }}
            >
              <Button variant="outlined" component="span">
                Update Images
              </Button>
            </Box>
          </label>
          <TextField
            label="Author"
            type="text"
            sx={{ mt: 2 }}
            fullWidth
            name="author"
            placeholder={"New's Author"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            value={formValues.author}
            onChange={handleChange}
            required
          />
          <TextField
            label="Title"
            fullWidth
            sx={{ mt: 2 }}
            name="title"
            placeholder={"New's Title"}
            value={formValues.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
            name="description"
            placeholder={"New's Description"}
            value={formValues.description}
            onChange={handleChange}
            required
          />
          <Button
            variant={loading ? "disabled" : "contained"}
            type="submit"
            sx={{ mt: 3, float: "right" }}
            className="bg-[#3e50ce]"
          >
            {loading ? "Please Wait...." : "Update"}
          </Button>
        </form>
      </StyledRoot>
    </Page>
  );
};

export default EditNews;
