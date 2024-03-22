import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";

const SideBarNews = ({ newes }) => {
  const navigate = useNavigate();

  return (
    <Grid item lg={4}>
      <Container sx={{ mx: "auto" }}>
        <Stack sx={{ pb: "30px", gap: 4 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              fontFamily: "Roboto",
              letterSpacing: "2px",
            }}
          >
            MOST VISITED
          </Typography>
          {newes
            .map((data, index) => {
              // console.log("new in most visied======", data);
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    alignItems: "start",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/news/${data.id}`)}
                >
                  <Box flex={1} sx={{ display: "flex", height: "150px" }}>
                    <img
                      src={`${process.env.REACT_APP_URL}${data.banner_image}`}
                      alt={`News Image ${index}`}
                      style={{
                        height: "100%",
                        width: "120%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box flex={1} sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: "17px", fontWeight: "600" }}>
                      {data.title}
                    </Typography>
                  </Box>
                </Box>
              );
            })
            .splice(-5)}
        </Stack>
      </Container>
    </Grid>
  );
};

export default SideBarNews;
