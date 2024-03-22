import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { CiHeart } from "react-icons/ci";
import React from "react";
import { CgScreenMirror } from "react-icons/cg";
import { FaCode } from "react-icons/fa6";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { MdEmojiFlags } from "react-icons/md";
import { Download } from "@mui/icons-material";
import { useLocation } from "react-router";
const cardData = [
  {
    imgSrc: "/assets/images/block1.png",
    title: "Block 1",
    description: "Description for Block 1",
  },
  {
    imgSrc: "/assets/images/block2.jpg",
    title: "Block 2",
    description: "Description for Block 2",
  },
  {
    imgSrc: "/assets/images/block2.jpg",
    title: "Block 2",
    description: "Description for Block 2",
  },
];
const Blockpage = () => {
  const location = useLocation();
  const blockData = location.state?.blockData;
  const theme = useTheme();

  return (
    <>
      <Box sx={{ padding: "100px 150px" }}>
        <Grid container spacing={5}>
          {blockData && (
            <Grid item lg={8}>
              <Box>
                <img src={blockData.imgs} alt="" />
              </Box>
            </Grid>
          )}
          {blockData && (
            <Grid lg={4} sx={{ marginTop: "30px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  paddingLeft: "20px",
                }}
              >
                <Box>
                  <Typography sx={{ textAlign: "start" }}>
                    {blockData.title}
                  </Typography>
                  <Typography sx={{ textAlign: "start" }}>
                    {blockData.description}
                  </Typography>
                </Box>
                <Box sx={{ marginLeft: "30%", marginTop: "50px" }}>
                  <button
                    style={{
                      backgroundColor: "#0077b6",
                      color: "white",
                      padding: "7px 15px",
                      border: "none",
                    }}
                  >
                    Download
                  </button>
                </Box>
                <Box>
                  <Divider />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "30px",
                    fontSize: "15px",
                  }}
                >
                  <CiHeart style={{ fontSize: "20px" }} />
                  <CgScreenMirror style={{ fontSize: "20px" }} />
                  <FaCode style={{ fontSize: "20px" }} />
                  <MdOutlineDriveFolderUpload style={{ fontSize: "20px" }} />
                  <MdEmojiFlags style={{ fontSize: "20px" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "20px",
                    marginTop: "30px",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography>{blockData.tags}</Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      <Box sx={{ padding: "100px 150px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
          Similar Examples
        </Typography>
        <Grid container spacing={2}>
          {cardData.map((card, index) => (
            <Grid item xs={12} md={4} lg={4} key={index}>
              <CardMedia
                component="img"
                src={card.imgSrc}
                sx={{ height: "190px" }}
              />
              <CardContent>
                <Typography variant="h6" color="#777" fontWeight="bold">
                  {card.title}
                </Typography>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  height: "30px",
                  px: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{card.description}</Typography>
                <Download />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* {blockData && (
                <Box sx={{ padding: '100px 150px' }}>
                    <Grid container spacing={5}>
                        <Grid item lg={8}>
                            <Box>
                                <img src={blockData.imgs} alt={blockData.title} />
                            </Box>
                        </Grid>
                        <Grid lg={4} sx={{ marginTop: '30px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingLeft: '20px' }}>
                                <Typography sx={{ textAlign: 'start' }}>{blockData.title}</Typography>

                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', fontSize: '15px' }}>
                                    <Typography>{blockData.title}</Typography>
                                    <Typography>{blockData.description}</Typography>
                                    <Typography>{blockData.tags}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )} */}

      <Box sx={{ padding: "100px 150px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
          Similar Examples
        </Typography>
        <Grid container spacing={2}>
          {cardData.map((card, index) => (
            <Grid item xs={12} md={4} lg={4} key={index}>
              <CardMedia
                component="img"
                src={card.imgSrc}
                sx={{ height: "190px" }}
              />
              <CardContent>
                <Typography variant="h6" color="#777" fontWeight="bold">
                  {card.title}
                </Typography>
                <Divider />
                <Box
                  sx={{
                    height: "30px",
                    px: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{card.description}</Typography>
                  <Download />
                </Box>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Blockpage;
