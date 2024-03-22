import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "red",
    fontSize: "3rem",
  },
}));
const Test = () => {
  const classes = useStyles();
  const tags = ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5"];
  const images = [
    "/assets/images/comp.jpg",
    "/assets/images/hospital.jpg",
    "/assets/images/mall.jpg",
    "/assets/images/sp1.jpg",
    "/assets/images/stadium.jpg",
    "/assets/images/img1.webp",
    "/assets/images/villa.webp",
  ];

  const [remainingImagesDialogOpen, setRemainingImagesDialogOpen] =
    useState(false);

  const handleRemainingImagesDialog = () => {
    setRemainingImagesDialogOpen(!remainingImagesDialogOpen);
  };
  const {state} = useLocation()
  console.log(state)
  return (
    <div style={{ padding: "50px" }}>
      <Box display="flex">
        <Box flex={1}>
          <img
            src="/assets/images/hospital.jpg"
            alt="Full Width"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box flex={1} sx={{ ml: 2 }}>
          <Typography variant="h6">{state.title || 'Title'}</Typography>
          <Typography variant="subtitle1">
            {state.description || 'Description'}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Tags
          </Typography>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
          ))}
          <Typography variant="h6" sx={{ my: 2 }}>
            Images
          </Typography>
          <Grid container>
            {images.slice(0, 5).map((image, index) => (
              <Grid item key={index}>
                <div
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <img
                    src={image}
                    alt="Image"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      textAlign: "center",
                      background: index == 4 ? "rgba(0,0,0,0.5)" : null,
                      height: "100px",
                      width: "100px",
                      cursor: "pointer",
                    }}
                  >
                    {index == 4 && (
                      <Typography
                        variant="h5"
                        textAlign="center"
                        sx={{ mt: "30%" }}
                        onClick={handleRemainingImagesDialog}
                      >
                        +{images.length - 5}{" "}
                      </Typography>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Dialog
        open={remainingImagesDialogOpen}
        onClose={handleRemainingImagesDialog}
      >
        <DialogTitle>Remaining Images</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item key={index}>
                <img
                  src={image}
                  alt={`Image ${index}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemainingImagesDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Divider sx={{ mt: 3 }} />
      <Box sx={{ p: 3, display: "flex" }}>
        <Box flex={1}>
          <Typography variant="h6" fontWeight="bold">
            1.EASY ACCESS
          </Typography>
          <Typography>
            The first step of any bdreep, ;ayout is obviously, the bed
            placement. Make sure that the bed is accessible on both sides. Even
            in tighter spaces, this will give the appearances of a larger space
            ands will lend a sense of balance to your room.
          </Typography>
          <Typography variant="h6" fontWeight="bold" mt={2}>
            2.HEAD SPACE
          </Typography>
          <Typography>
            The first step of any bdreep, ;ayout is obviously, the bed
            placement. Make sure that the bed is accessible on both sides. Even
            in tighter spaces, this will give the appearances of a larger space
            ands will lend a sense of balance to your room. The first step of
            any bdreep, ;ayout is obviously, the bed placement. Make sure that
            the bed is accessible on both sides. Even in tighter spaces, this
            will give the appearances of a larger space ands will lend a sense
            of balance to your room. The first step of any bdreep, ;ayout is
            obviously, the bed placement. Make sure that the bed is accessible
            on both sides. Even in tighter spaces, this will give the
            appearances of a larger space ands will lend a sense of balance to
            your room.
          </Typography>
        </Box>
        <Box flex={1}>
          <Grid container spacing={3}>
            {images.map((image, index) => (
              <Grid item xs={4} md={4} lg={4}>
                <img
                  src={image}
                  alt={`Image ${index}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Test;
