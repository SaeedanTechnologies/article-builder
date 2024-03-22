import React from 'react'
import { Typography,Box,Button, Stack, Drawer,IconButton, Toolbar, DialogContent, Grid } from '@mui/material'
import { Close } from '@mui/icons-material'
const SideBar = (props) => {
  return (
    <div>
        <Drawer
        onClose={props.close} 
        variant='temporary' 
        open={props.open} 
        anchor='top'
        PaperProps={{
            sx:{
                height:'80vh',
                background:'#000',
                color:'#fff'
            }
        }}
        >
            <Toolbar>
             <Typography sx={{color:'fff', fontWeight:'bold', 
             fontSize:'3rem', fontFamily:'Bebas Neue', 
             letterSpacing:2, mt:2}}>
                                BUILDNER
                            </Typography>
            <Box sx={{display:'flex', mr:2, ml:'auto'}}>
            <IconButton
            onClick={props.close}
            sx={{
                '&:hover': {
                    border:'1px solid white',
                    borderRadius:0,
                }
            }}
            >
                <Close sx={{color:'#fff', fontSize:'1.5rem'}} />
            </IconButton>
            </Box>
                </Toolbar>
                <DialogContent>
                    <Grid container sx={{p:4}}>
                        <Grid item
                        xs={12}
                        md={8}
                        lg={8}
                        >

                            <Stack direction="row" spacing={10}>
                            <Stack spacing={1}>
                                <Typography sx={{fontSize:'15px', color:'grey'}}> COMPETETION </Typography>
                                <Typography> Open Competetions </Typography>
                                <Typography> House of the Future </Typography>
                                <Typography> Housing Crisis Competetions </Typography>
                                <Typography> Competetion results </Typography>
                                <Typography> Guest jury </Typography>

                            </Stack>
                            <Stack spacing={1}>
                                <Typography sx={{fontSize:'15px', color:'grey'}}> RESOURCES </Typography>
                                <Typography> News & blog </Typography>
                                <Typography> Book store </Typography>
                                <Typography> Univeristy rankings </Typography>
                                <Typography> Presentation review </Typography>
                                <Typography> Upload panel </Typography>
                            </Stack>
                            <Stack spacing={1}>
                                <Typography sx={{fontSize:'15px', color:'grey'}}> ABOUT </Typography>
                                <Typography> About us </Typography>
                                <Typography> KYC And Competetion Integrity </Typography>
                                <Typography> Privacy Policy </Typography>
                                <Typography> Website Terms & Conditions </Typography>
                                <Typography> Contact us </Typography>
                            </Stack>
                            <Box sx={{borderRight:'1px solid #e2e2e2', height:'45vh', }} />
                            </Stack>
                        </Grid>
                        <Grid item
                        xs={12}
                        md={4}
                        lg={4}
                        >
                            <Box sx={{display:'flex', justifyContent:'center'}}>
                                <Stack>
                                    <Button variant='contained'
                                    className='bg-white'
                                    sx={{color:'#000', borderRadius:0, height:'50px'}}
                                    >
                                        Login with Architecture.info
                                    </Button>
                                    <div class="divider">
                                    <span>OR</span>
                                    </div>
                                    <Typography sx={{
                                        textDecoration:'underline',
                                        mt:4
                                    }}>
                                        Create an account at Architecture.info
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
        </Drawer>
    </div>
  )
}

export default SideBar
