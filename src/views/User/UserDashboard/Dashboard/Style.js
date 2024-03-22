import { Box, Card, styled } from "@mui/material";

export const StyledRoot = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    backgroundColor: '#f7f7f7',
    padding: theme.spacing(5),
    paddingTop: theme.spacing(10)

    


}));
export const StyledBox = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1),
    height: "50vh",


}));

