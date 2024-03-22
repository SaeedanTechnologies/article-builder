import { Box, Card, styled } from "@mui/material";

export const StyledRoot = styled(Box)(({theme})=> ({
    minHeight:'100vh',
    padding:theme.spacing(2)
}))

export const StyledContent = styled(Box)(({theme})=>({
    padding:theme.spacing(4),
    minHeight:'50vh'
}))

 export const StyledProjectRoot = styled(Box)(({theme})=>({
    paddingLeft:theme.spacing(15),
    paddingRight:theme.spacing(15),
    minHeight:'80vh'
}))

export const StyledProjectCard = styled(Card)(({theme})=>({
    padding:theme.spacing(3)
}))

export const StyledProjectTop = styled (Box)(({theme})=>({
    height:'25vh'
}))

export const StyledProjectBottom = styled (Box)(({theme})=>({
    height:'50vh',
    marginTop:'2rem'
}))

