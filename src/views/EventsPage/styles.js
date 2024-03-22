import { Box, Container, styled } from "@mui/material";

export const StyledRoot = styled(Box)(({theme})=>({
    height:'80vh',
    background:'#3B318A',
    overflow:'hidden'
}))

export const StyledContentRoot = styled (Box)(({theme})=>({
    paddingTop:theme.spacing(10)
}))