import { Box, styled } from "@mui/material";
export const BodyStyle = styled(Box)(({theme})=> ({
    backgroundColor: 'black',
    height: '100vh'
}))

export const StyledRoot = styled(Box)(({theme})=>({
    padding: theme.spacing(10,25)
}))