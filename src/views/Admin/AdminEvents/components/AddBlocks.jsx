import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import {
  createBlockCategory,
  createBlocks,
  deleteCategory,
  getCategory,
} from "../../../../store/actions/userActions";
import { enqueueSnackbar } from "notistack";
import { confirmAlert } from "react-confirm-alert";

const AddBlocks = (props) => {
  const initialValues = {
    title: "",
    description: "",
    tags: [],
    imgs: [],
    block_category_id: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = React.useState("");
  const [blockCategory, setBlockCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State to hold selected category

  const handleChange1 = (event) => {
    setSelectedCategory(event.target.value); // Update selected category on change
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleImageChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedImage(filesArray);
    setFormValues({ ...formValues, imgs: filesArray });
  };

  const handleDeleteChip = (chipToDelete) => () => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
  };

  const handleAddChip = () => {
    if (inputValue.trim() !== "" && !formValues.tags.includes(inputValue)) {
      setFormValues((prevValues) => ({
        ...prevValues,
        tags: [...prevValues.tags, inputValue],
      }));
      setInputValue("");
    }
  };

  const handleSubmit = (e) => {
    setloading(true);
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("tags[]", formValues.tags);
    formData.append("imgs[]", selectedImage);

    formData.append("block_category_id", selectedCategory);
    dispatch(createBlocks(formData))
      .then((result) => {
        setloading(false);

        setFormValues(initialValues);
        props.close();
        props.createSuccess();
        enqueueSnackbar(result.data.message, {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const getBlockCategory = () => {
    dispatch(getCategory())
      .then((result) => {
        setBlockCategory(result.data.payload);
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      });
  };

  useEffect(() => {
    getBlockCategory();
  }, []);

  const handleEdit = (categoryId) => {
    console.log(`Editing category with ID: ${categoryId}`);
  };

  const handleDelete = (id) => {
    // setDelLoading(true)
    confirmAlert({
      title: "Delete?",
      message: "Are you sure to want to delete this event ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteCategory(id))
              .then((result) => {
                // setDelLoading(false)
                enqueueSnackbar(result.data.message, {
                  variant: "success",
                });
              })
              .catch((err) => {
                // setDelLoading(false)
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
    <>
      <Box>
        <Dialog
          open={props.open}
          onClose={props.close}
          sx={{ padding: "30px" }}
          fullWidth
        >
          <DialogTitle>Add Event</DialogTitle>

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Category"
                value={selectedCategory}
                onChange={handleChange1}
              >
                {blockCategory.map((val, ind) => (
                  <MenuItem key={val.id} value={val.id}>
                    {val.name}
                    <Button
                      variant={loading ? "disabled" : "contained"}
                      type="submit"
                      sx={{ float: "right" }}
                      className="bg-[#3e50ce]"
                    >
                      {loading ? "Please Wait...." : "Update"}
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(val.id)}
                      //   endIcon={<DeleteIcon color="error" />}
                    >
                      {/* {delLoading ? 'Please Wait...' : 'Delete'} */}
                    </Button>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider />
            <DialogContent>
              <div>
                <label htmlFor="image">Upload images:</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
              <TextField
                label="Title"
                fullWidth
                sx={{ mt: 2 }}
                name="title"
                required
                value={formValues.title}
                onChange={handlechange}
              />
              <TextField
                label="Description"
                fullWidth
                sx={{ mt: 2 }}
                name="description"
                required
                value={formValues.description}
                onChange={handlechange}
              />

              <TextField
                label="Add Chip"
                fullWidth
                value={inputValue}
                style={{ marginTop: "20px" }}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddChip();
                  }
                }}
                onBlur={handleAddChip}
              />
              <Box sx={{ marginTop: 2 }}>
                {formValues.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={handleDeleteChip(tag)}
                    onClick={() => {
                      console.log(`Clicked on: ${tag}`);
                    }}
                    sx={{ marginRight: 1, marginBottom: 1 }}
                    clickable
                    deleteIcon={<span>&times;</span>}
                  />
                ))}
              </Box>
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
                  "Create Blocks"
                )}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </>
  );
};

export default AddBlocks;
