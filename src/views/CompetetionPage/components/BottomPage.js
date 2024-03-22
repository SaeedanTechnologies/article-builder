import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";

const StyledContent = styled(Box)(({ theme }) => ({
  minHeight: "50vh",
  padding: theme.spacing(5),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: 5,
  fontWeight: "bold",
  color: "#000",
}));
const BottomPage = () => {
  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#fff" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img src="/assets/images/log.png" style={{ width: "60px" }} />
          <Box>
            <StyledButton>Downloads</StyledButton>
            <StyledButton>Prizes</StyledButton>
            <StyledButton>Jury</StyledButton>
            <StyledButton>Key Dates </StyledButton>
            <StyledButton>Fees</StyledButton>
            <StyledButton>Faq</StyledButton>
            <IconButton>
              <EmailIcon sx={{ color: "#000", ml: -1 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <StyledContent>
        <Box>
          <Typography variant="h3" textAlign="center">Competetion Introduction</Typography>
          <Typography textAlign="center" sx={{ mt: 8, mb: 2 }}>
            COMPETETION ORGANISERS
          </Typography>
          <Typography textAlign="center" fontWeight="bold" variant="h2">
            BUILDNER
          </Typography>
          <Typography textAlign="center" sx={{ mt: -1, fontWeight: "bold" }}>
            Architecture Competetions
          </Typography>
            <Box sx={{display:'flex', justifyContent:'center', mt:5}}>
          <Typography sx={{width:'50%'}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
          </Typography>
            </Box>
        </Box>
      </StyledContent>
    </div>
  );
};

export default BottomPage;
