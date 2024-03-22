import { Box, styled } from "@mui/material";

export const StyledRoot = styled(Box)(({theme})=>({
    background:'#e2e2e2',
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}))

export const StyledContainer = styled(Box)(({theme})=>({
    border:'1px solid black',
    borderRadius:'10px',
    width:'100%',
    height:'100% ',
    display:'flex',
    overflow:'hidden'
}))

export const StyledSideBar = styled(Box)(({theme})=> ({
    flex:1,
    background:theme.palette.secondary.main
}))

export const StyledChat = styled(Box)(({theme})=> ({
    flex:2,
    background:'#fff',
    // marginBottom:10
}))