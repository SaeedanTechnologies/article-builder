import React from 'react';
import Header from '../components/AppBar';
import { Box, Button, Grid, TextField, TextareaAutosize, Typography, styled } from '@mui/material';
const StyledRoot = styled(Box)(({ theme }) => ({
    padding: theme.spacing(7)
}));
const ContactUs = () => {
    return (
        <>
            <Header />
            <StyledRoot>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '2rem' }}>Get In Touch</Typography>
                    <Typography sx={{ color: '#999' }}>Let's talk about your project</Typography>
                </Box>
                <Box sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', mt: '50px' }}>

                    <TextField
                        id="outlined-password-input"
                        label="Name"
                        type="text"

                    />
                    <TextField
                        id="outlined-password-input"
                        label="Email"
                        type="email"

                    />
                    <TextField
                        id="outlined-password-input"
                        label="Contact"
                        type="number"

                    />
                    <Button sx={{ background: 'gray', padding: '10px', border: '1px solid red' }}>
                        Submit
                    </Button>
                </Box>





            </StyledRoot>

        </>
    );
};

export default ContactUs;