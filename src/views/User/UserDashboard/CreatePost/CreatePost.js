import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  CreateProject,
  getCategories,
} from "../../../../store/actions/userActions";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Create a new FormData object to handle file uploads
    const formData = new FormData();
    formData.append("category_id", data.category_id);
    formData.append("title", data.title);
    formData.append("specs", data.specs);
    formData.append("description", data.description);

    // Append each selected file to the FormData object
    for (const file of data.image) {
      formData.append("image[]", file);
    }

    dispatch(CreateProject(formData))
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          enqueueSnackbar(res.data.message, {
            variant: "success",
          });
          // navigate('/')
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    dispatch(getCategories())
      .then((response) => {
        setCategories(response.data.payload);
        console.log("categories response========", response.data.payload);
      })
      .catch((err) => {
        console.log("error=========", err);
      });
  }, []);

  return (
    <Box
      sx={{
        padding: "50px",
        maxWidth: "900px",
        margin: "100px auto",
        boxShadow: 3,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid
            item
            lg={6}
            style={{
              width: "200px",
              height: "300px",
              backgroundColor: "#f0f0f0",
              border: "2px dashed #aaaaaa",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div>
              <label htmlFor="image">Upload images:</label>
              <input
                type="file"
                id="image"
                {...register("image", {
                  validate: {
                    atLeastTwoImages: (files) =>
                      files.length > 1 || "Please select more than one image",
                  },
                })}
                accept="image/*"
                multiple
              />
              {errors.image && (
                <p className="text-red-600">{errors.image.message}</p>
              )}
            </div>
          </Grid>
          <Grid item lg={6}>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <InputLabel>Category_id</InputLabel>
                    <FormControl variant="standard">
                      <Select
                        id="category_id"
                        {...register("category_id", {
                          required: "category_id is required",
                        })}
                      >
                        {errors.category_id && (
                          <p className="text-red-600">
                            {errors.category_id.message}
                          </p>
                        )}

                        {categories?.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.id}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={6}>
                    <InputLabel>Specification</InputLabel>
                    <FormControl variant="standard">
                      <Select
                        id="specs"
                        {...register("specs", {
                          required: "specs is required",
                        })}
                      >
                        {errors.specs && (
                          <p className="text-red-600">{errors.specs.message}</p>
                        )}
                        {["Text", "Number"].map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12}>
                <InputLabel>Title</InputLabel>
                <TextField
                  id="title"
                  variant="standard"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  sx={{ width: "100%" }}
                />
                {errors.title && (
                  <p className="text-red-600">{errors.title.message}</p>
                )}
              </Grid>
              <Grid item lg={12}>
                <InputLabel>Description</InputLabel>
                <TextField
                  id="description"
                  variant="standard"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  sx={{ width: "100%" }}
                />
                {errors.description && (
                  <p className="text-red-600">{errors.description.message}</p>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12}>
            <Button
              style={{ backgroundColor: "#3e5bf0", color: "white" }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Create Project"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreatePost;
