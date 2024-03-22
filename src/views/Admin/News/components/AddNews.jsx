import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Select,
  MenuItem,
  DialogActions,
  InputAdornment,
  Grid,
  IconButton,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNews } from "../../../../store/actions/userActions";
import { useSnackbar } from "notistack";
import { ThreeDots } from "react-loader-spinner";

const AddNews = (props) => {
  const initialValues = {
    title: "",
    description: "",
    author: "",
    banner_image: {},
    images: [],
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [bannerImage, setBannerImage] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const deleteImage = (index) => {
    const imagesArray = [...formValues.images];
    imagesArray.splice(index, 1);
    // console.log("=======imagesArray======", imagesArray);
    setFormValues({ ...formValues, images: imagesArray });
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

  const handleBannerImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormValues({ ...formValues, [name]: file });
    setBannerImage(file);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    if (!bannerImage) {
      setLoading(false);
      alert("Please select an image");
    } else {
      formData.append("title", formValues.title);
      formData.append("description", formValues.description);
      formData.append("author", formValues.author);
      formData.append("banner_image", formValues.banner_image);

      formValues.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      dispatch(createNews(formData))
        .then((result) => {
          setLoading(false);
          setBannerImage(null);
          setFormValues(initialValues);
          props.close();
          props.createSuccess();
          enqueueSnackbar(result.data.message, {
            variant: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log("=====formValues ========", formValues);

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      fullWidth
      PaperProps={{ style: { maxWidth: "80vw" } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>CREATE NEWS</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Box
            sx={{
              height: "40vh",
              border: "1px dashed grey",
              position: "relative",
              marginTop: 2,
            }}
          >
            {bannerImage && (
              <div
                style={{
                  backgroundImage: `url(${URL.createObjectURL(bannerImage)}`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" component="span">
                Choose Banner Image
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
              {formValues.images.map((image, index) => (
                <Grid key={index} item xs={3}>
                  <Box
                    sx={{
                      height: "30vh",
                      border: "1px dashed grey",
                      position: "relative",
                      borderRadius: "10px",
                    }}
                  >
                    <IconButton
                      onClick={() => deleteImage(index)}
                      sx={{
                        position: "absolute",
                        borderRadius: "50%",
                        top: -19,
                        right: -14,
                        zIndex: 20,
                        height: "auto",
                        "&.MuiIconButton-root": {
                          backgroundColor: "#ff0000",
                        },
                      }}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: "17px",

                          color: "#fff",
                          cursor: "pointer",
                        }}
                      />
                    </IconButton>

                    {formValues.images.length && (
                      <div
                        style={{
                          backgroundImage: `url(${URL.createObjectURL(image)}`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              ))}
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
              onChange={handleMultipleImagesChange}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <Button variant="outlined" component="span">
                Choose Images
              </Button>
            </Box>
          </label>

          <TextField
            label="Author"
            type="text"
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
            onChange={handlechange}
            required
          />

          <TextField
            label="Title "
            fullWidth
            name="title"
            placeholder={"New's Title"}
            value={formValues.title}
            onChange={handlechange}
            required
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            name="description"
            placeholder={"New's Description"}
            value={formValues.description}
            onChange={handlechange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} variant="outlined">
            Close
          </Button>

          <Button
            type="submit"
            variant={loading ? "disabled" : "contained"}
            className="bg-[#3e50ce]"
          >
            {loading ? (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#fff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              "Create News"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddNews;
