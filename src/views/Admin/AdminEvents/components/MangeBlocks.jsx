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
} from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddBlocks from "./AddBlocks";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteBlocks,
  getAllBlocks,
} from "../../../../store/actions/userActions";
import { ThreeDots } from "react-loader-spinner";
import { confirmAlert } from "react-confirm-alert";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";
const ManageBlocks = () => {
  const [open, setOpen] = React.useState(false);
  const [blocks, setBlocks] = React.useState([]);
  const [delLoading, setDelLoading] = React.useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const getBlocks = () => {
    dispatch(getAllBlocks())
      .then((result) => {
        setLoading(false);

        setBlocks(result.data.payload);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  console.log("blocks in manageBlock========", blocks);
  React.useEffect(() => {
    getBlocks();
  }, []);
  const handleDelete = (id) => {
    setDelLoading(true);
    confirmAlert({
      title: "Delete?",
      message: "Are you sure to want to delete this event ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteBlocks(id))
              .then((result) => {
                setDelLoading(false);
                enqueueSnackbar(result.data.message, {
                  variant: "success",
                });
                getBlocks();
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
    navigate("/admin/edit-block", { state: data });
  };
  return (
    <>
      <Box sx={{ padding: "30px" }}>
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
            All Blocks
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 0 }}
            endIcon={<AddCircleOutlineIcon />}
          >
            Add New Blocks
          </Button>
        </Box>
        <Divider sx={{ mt: 2 }} />

        <Grid container sx={{ mt: 4 }} spacing={3}>
          {blocks.map((val, ind) => {
            // console.log(val)
            return (
              <Grid item xs={12} md={6} lg={6}>
                <Card sx={{ maxWidth: "500px" }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={val.imgs}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {val.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {val.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "blue" }}>
                      <span style={{ color: "black", fontWeight: 600 }}>
                        {" "}
                        Tags:
                      </span>{" "}
                      {val.tags}
                    </Typography>
                  </CardContent>
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
          })}
        </Grid>
        <AddBlocks
          open={open}
          close={() => setOpen(false)}
          createSuccess={getBlocks}
        />
      </Box>
    </>
  );
};

export default ManageBlocks;
