import React from "react";
import Header from "../../components/AppBar/Header";
import Page from "../../components/page";
import { StyledContent, StyledRoot } from "./styles";
import {
  AppBar,
  Box,
  Card,
  CardMedia,
  Divider,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ShopDrawing from "./components/ShopDrawing";
import Projects from "./components/Projects";
import Data from "./components/Data";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const StyledCard = styled(Card)(({ theme }) => ({
  height: "200px",
  width: "250px",
  py: 4,
  margin: "0px 20px",
  cursor: "pointer",
}));
const WikiPage = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Wiki Page">
      <StyledRoot>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            gap: 5,
          }}
        >
          <Stack
            component={Link}
            sx={{ backgroundColor: "transparent", gap: 3 }}
            elevation={0}
            to="/wiki-page/shop-drawing"
          >
            <CardMedia
              component="img"
              src="/assets/images/img1.webp"
              sx={{ width: "250px", height: "250px", objectFit: "cover" }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: theme.palette.primary.main,
                fontFamily: "Josefin Sans, sans-serif",
              }}
            >
              Shop Drawing
            </Typography>
          </Stack>
          <Stack
            component={Link}
            to="/wiki-page/arc-data"
            elevation={0}
            sx={{ backgroundColor: "transparent", gap: 3 }}
          >
            <CardMedia
              component="img"
              src="/assets/images/img1.webp"
              sx={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
            <Typography
              variant="h5"
              sx={{
                pb: 2,
                textAlign: "center",
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontFamily: "Josefin Sans, sans-serif",
              }}
            >
              Arc Data
            </Typography>
          </Stack>
          <Stack
            component={Link}
            to="/wiki-page/projects"
            sx={{ backgroundColor: "transparent", gap: 3 }}
            elevation={0}
          >
            <CardMedia
              component="img"
              src="/assets/images/img1.webp"
              sx={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
            <Typography
              variant="h5"
              sx={{
                pb: 2,
                textAlign: "center",
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontFamily: "Josefin Sans, sans-serif",
              }}
            >
              Projects
            </Typography>
          </Stack>
        </Box>
      </StyledRoot>
      {/* <Header /> */}
      {/* <Box sx={{display:'flex', justifyContent:'center', mt:-7}}>
            <Box>
            <img src="/assets/images/log.png"/>
            <Typography variant='h4' textAlign="center" sx={{mt:-8}}>
            Architecture
            </Typography>
            </Box>
        </Box> */}
      {/* <AppBar position='static' sx={{bgcolor:'#fff'}}>
                <Toolbar>
                    <Box sx={{display: 'flex', justifyContent: 'center', flexGrow:1 }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab value={0} label="Shop Drawing" />
                        <Tab value={2} label="Data" />
                        <Tab value={1} label="Projects" />
                    </Tabs>
                    </Box>
                </Toolbar>
            </AppBar> */}
      <StyledRoot>
        {/* <StyledContent>
                    {value == 0 && <Data /> }
                    {value == 1 && <Data />}
                    {value==2 && <Data />}
                </StyledContent> */}
      </StyledRoot>
    </Page>
  );
};

export default WikiPage;
