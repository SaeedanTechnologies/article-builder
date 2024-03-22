import { Box, Card, styled } from "@mui/material";

export const StyledRoot = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: '#f7f7f7',
    padding: theme.spacing(6)
}));

export const StyledBox = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(2),
    minHeight: '40vh'
}));

export const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(.8),
    padding: theme.spacing(2)
}));