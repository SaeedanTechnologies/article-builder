import { Download } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  styled,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router'
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { getAllUsersBlocks } from "../../../store/actions/blocksActions";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DownloadIcon from "@mui/icons-material/Download";

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
}));
const StyledCard = styled(Card)(({ theme }) => ({}));

const Blocks = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [blocks, setBlocks] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const getBlocks = () => {
    dispatch(getAllUsersBlocks())
      .then((result) => {
        // console.log("blocks=======", result.data.payload);
        setLoading(false);
        setBlocks(result.data.payload);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getBlocks();
  }, []);
  const handleBlock = (data) => {
    navigate("/block-page", { state: { blockData: data } });
  };

  return (
    <StyledRoot>
      {!blocks.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <ThreeDots
            height="85"
            width="80"
            radius="9"
            color="#3e50ce"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </Box>
      ) : (
        <Grid container sx={{ mt: 4 }} spacing={3}>
          {blocks.map((val, ind) => {
            // console.log(val)
            return (
              <Grid onClick={() => handleBlock(val)} item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: "500px" }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    image={"/assets/images/block2.jpg"}
                    title="green iguana"
                  />
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      px: 3,
                      py: 2,
                    }}
                  >
                    <Stack>
                      <Typography gutterBottom variant="h5" component="div">
                        {val.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {val.description}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "blue" }}>
                        <span style={{ color: "black", fontWeight: 500 }}>
                          {" "}
                          Tags:
                        </span>{" "}
                        {val.tags}
                      </Typography>
                      <Stack direction="row">
                        <IconButton onClick={() => alert("bookmark")}>
                          <BookmarkIcon
                            sx={{ fontSize: 22, color: "#ff0000" }}
                          />
                        </IconButton>
                        <IconButton onClick={() => alert("download")}>
                          <DownloadIcon
                            sx={{ fontSize: 22, color: "#ff0000" }}
                          />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Stack>
                  {/* <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </StyledRoot>
  );
};

export default Blocks;

{
  /* <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            src="/assets/images/block1.png"
                            sx={{ height: '190px' }}
                            onClick={handleBlock}
                        />
                        <CardContent>
                            <Typography variant='h6' color="#777" fontWeight="bold">
                                Block
                            </Typography>
                        </CardContent>
                        <Divider />
                        <Box sx={{ height: '30px', px: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>
                                This is the description
                            </Typography>
                            <Download />
                        </Box>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            src="/assets/images/block2.jpg"
                            sx={{ height: '190px' }}
                        />
                        <CardContent>
                            <Typography variant='h6' color="#777" fontWeight="bold">
                                Block
                            </Typography>
                        </CardContent>
                        <Divider />
                        <Box sx={{ height: '30px', px: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>
                                This is the description
                            </Typography>
                            <Download />
                        </Box>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            src="/assets/images/block1.png"
                            sx={{ height: '190px' }}
                        />
                        <CardContent>
                            <Typography variant='h6' color="#777" fontWeight="bold">
                                Block
                            </Typography>
                        </CardContent>
                        <Divider />
                        <Box sx={{ height: '30px', px: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>
                                This is the description
                            </Typography>
                            <Download />
                        </Box>
                    </StyledCard>
                </Grid>
            </Grid> */
}
