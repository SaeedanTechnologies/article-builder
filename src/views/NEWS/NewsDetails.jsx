import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import moment from "moment";
import { useDispatch } from "react-redux";
import NewsComponent from "./molecules/NewsComponent";
import { getAllNews } from "../../store/actions/userActions";
import { useParams } from "react-router-dom";

const NewsDetails = () => {
  const dispatch = useDispatch();
  const [newes, setNewes] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { newsId } = useParams();

  React.useEffect(() => {
    setLoading(true);
    dispatch(getAllNews())
      .then((result) => {
        // console.log("=========result data========", result.data.payload);
        setNewes(result.data.payload);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <NewsComponent Loading={Loading} newes={newes}>
      {newes
        .filter((news) => news.id === parseInt(newsId))
        .map((news, index) => (
          <Box key={index} sx={{ pb: 6 }}>
            <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
              {news.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "semibold" }}>
                {news.author} <br />
                <span
                  style={{
                    color: "gray",
                    fontSize: "16px",
                    fontStyle: "italic",
                  }}
                >
                  {`about ${moment(news.updated_at).fromNow()}`}
                </span>
              </Typography>
              <Box sx={{ width: "100%" }}>
                <img
                  src={`${process.env.REACT_APP_URL}${news.banner_image}`}
                  alt="abc"
                  style={{
                    height: "60vh",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Grid
                container
                columns={0}
                columnSpacing={3}
                rowSpacing={3}
                pb="20px"
              >
                {news.images.slice(0, 4).map((image, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      flex={1}
                      sx={{
                        height: "170px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <img
                        key={index}
                        src={`${process.env.REACT_APP_URL}${image.image}`}
                        alt={`Thumbnail ${index}`}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          marginRight: "20px",
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography sx={{ fontSize: "20px" }}>
                {news.description}{" "}
              </Typography>
            </Box>
          </Box>
        ))}
    </NewsComponent>
  );
};

export default NewsDetails;
