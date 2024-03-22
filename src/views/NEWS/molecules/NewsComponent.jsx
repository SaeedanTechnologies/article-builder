import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import SideBarNews from "./SideBarNews";

const NewsComponent = ({ children, Loading, newes }) => {
  return (
    <>
      {/* <Header /> */}
      <Box margin={15}>
        {Loading ? (
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="#3e50ce"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <Grid container columnSpacing={5}>
            <Grid item lg={8}>
              {children}
            </Grid>

            <SideBarNews newes={newes} />
          </Grid>
        )}
      </Box>
    </>
  );
};

export default NewsComponent;
