import {
  AppBar,
  Avatar,
  Box,
  Button,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import BlockSectionContent from "./components/BlockSectionContent";
const BlockSection = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* <AppBar sx={{ background: '#fff',}} position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', color: '#000' }}>
          <img src="/assets/images/log.png" style={{ height: '80px' }} />
          <Box sx={{ mr: '-43%', ml: '35%', display: 'flex', alignItems: 'center' }} >
            <Avatar />
            <MenuIcon sx={{ ml: 2 }} />
          </Box>
        </Toolbar>
      </AppBar> */}
      {/* <Box
        sx={{
          position: "relative",
          height: "50vh",
          background: 'url("/assets/images/img2.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ ml: "-40%" }}>
            <img src="/assets/images/log.png" />
          </Box>
          <Box sx={{ ml: "2%" }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{
                background: "#e2e2e2",
                width: "500px",
                borderColor: "#fff",
                "& fieldset": { border: "none" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              className="bg-[#007bff]"
              sx={{ height: "40px" }}
            >
              <SearchIcon />
            </Button>
          </Box>
        </Box>
      </Box> */}
      <BlockSectionContent />
    </div>
  );
};

export default BlockSection;
