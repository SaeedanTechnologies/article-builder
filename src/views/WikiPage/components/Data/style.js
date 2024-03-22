import { Box, styled } from "@mui/material";

export const StyledData = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10,20), 
  backgroundColor: 'gray',
  boxSizing: 'border-box',

}));
