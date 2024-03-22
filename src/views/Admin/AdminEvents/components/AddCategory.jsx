import { TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BlockCategory } from "../../../../store/actions/userActions";

const AddCategory = () => {
  const initialValues = {
    name: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.name);

    dispatch(BlockCategory(formData))
      .then((result) => {
        setFormValues(initialValues);
        enqueueSnackbar(result.data.message, {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ padding: "30px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            sx={{ mt: 2 }}
            name="name"
            required
            value={formValues.name}
            onChange={handleChange}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "gray",
              color: "white",
              padding: "12px",
              border: "none",
              marginTop: "30px",
            }}
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
