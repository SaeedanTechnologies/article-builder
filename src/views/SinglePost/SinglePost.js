import React from 'react'
import Page from '../../components/page'
import Header from '../../components/AppBar/Header'
import { Avatar, Box, Button, Typography, styled, IconButton, Stack } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PeopleIcon from '@mui/icons-material/People';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FactoryIcon from '@mui/icons-material/Factory';
const StyledRoot = styled(Box)(({theme})=> ({
    minHeight:'100vh',
    padding:theme.spacing(5),
}))

const SinglePost = () => {
    const [currentImage, setCurrentImage] = React.useState(0);

    const handleNext = () => {
      setCurrentImage((prevImage) => (prevImage + 1) % imgData.length);
    };
  
    const handlePrev = () => {
      setCurrentImage((prevImage) =>
        prevImage === 0 ? imgData.length - 1 : prevImage - 1
      );
    };
    const imgData = [
        "/assets/images/img1.webp",
        "/assets/images/img2.webp",
        "/assets/images/img3.jpg",
        "/assets/images/img4.jpg"
    
      ]
  return (
    <Page
    title="Post"
    >
        <Header />
        <StyledRoot sx={{px:20}}>
            <Box>
                <Button sx={{fontWeight:'bold',}}> ArchDaily </Button>
                <Button sx={{fontWeight:'bold',}}> Projects </Button>
                <Button sx={{fontWeight:'bold',}}> Retirement </Button>
                <Button sx={{fontWeight:'bold',}}> Belgium </Button>
                <Button sx={{fontWeight:'bold',}}> Villa Kameleon/FELT architecture & design </Button>
            </Box>
            <Box>
                <Typography variant='h4' fontWeight="bold" sx={{ml:1}}>
                Villa Kameleon / FELT architecture & design
                </Typography>
            </Box>
            <Box sx={{mt:2, ml:2, display:'flex', justifyContent:'space-between', width:'65%'}}>
                <Box sx={{display:'flex'}}>
                <Avatar sx={{mr:2}}>
                    <FacebookIcon sx={{color:'#000'}} />
                </Avatar>
                <Avatar sx={{mr:2}}>
                    <TwitterIcon sx={{color:'#000'}} />
                </Avatar>
                <Avatar sx={{mr:2}}>
                    <LinkedInIcon sx={{color:'#000'}} />
                </Avatar>
                <Avatar sx={{mr:2}}>
                    <EmailIcon sx={{color:'#000'}} />
                </Avatar>
                <Avatar sx={{mr:2}}>
                    <PinterestIcon sx={{color:'#000'}} />
                </Avatar>
                </Box>
                <Box>
                    <Button 
                    startIcon={<FolderIcon />}
                    className='bg-[#3E3A57]' 
                    sx={{textTransform:'none'}} variant='contained'>
                        Save
                    </Button>
                </Box>
            </Box>
            <Box sx={{width:'65%', ml:2, mt:4}}>
            <Box position="relative" 
          sx={{ overflow: 'hidden', mt:2, }}
           width="100%" 
          height={400}>
            <div
            style={{
              display: 'flex',
              width: `${imgData.length * 100}%`,
              height:'100%',
              transform: `translateX(-${currentImage * (100 / imgData.length)}%)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {imgData.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index}`}
                style={{ objectFit: 'cover', width: `${100 / imgData.length}%`, height: '100%' }}
              />
            ))}
          </div>
      <IconButton
      className="hover-button"
        style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
      
      }}
        onClick={handlePrev}
        >
        <Avatar sx={{background:'#fff'}}>
        <ArrowBackIosNewIcon sx={{color:'#000'}} />
        </Avatar>
      </IconButton>

      <IconButton
      className="hover-button"
        style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)',}}
        onClick={handleNext}
      >
        <Avatar sx={{background:'#fff'}}>
        <ArrowForwardIosIcon sx={{color:'#000'}} />
        </Avatar>
      </IconButton>
      <Typography
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        Image {currentImage + 1} of {imgData.length}
      </Typography>
          </Box>
            </Box>
            <Box sx={{width:'65%', ml:2, mt:4}}
            width={100}
            height={50}
            >
                <Stack direction="row" spacing={2}>
                    <Box>
                        <img src='/assets/images/img1.webp' 
                        style={{ objectFit: 'cover', width:'100%', height: '70%' }}
                        />
                    </Box>
                    <Box>
                        <img src='/assets/images/img3.jpg' 
                        style={{ objectFit: 'cover', width:'100%', height: '70%' }}
                        />
                    </Box>
                    <Box>
                        <img src='/assets/images/img4.jpg' 
                        style={{ objectFit: 'cover', width:'100%', height: '70%' }}
                        />
                    </Box>
                    <Box>
                        <img src='/assets/images/img4.jpg' 
                        style={{ objectFit: 'cover', width:'100%', height: '70%' }}
                        />
                    </Box>
                    <Box>
                        <img src='/assets/images/img4.jpg' 
                        style={{ objectFit: 'cover', width:'100%', height: '70%' }}
                        />
                    </Box>
                    <Box>
                        <img src='/assets/images/img4.jpg' 
                        style={{ objectFit: 'cover', width:'100%', height: '70%' }}
                        />
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ml:2, mt:4}}>
                <Typography>
                Curated by 
                <Typography fontWeight="bold" sx={{display:'inline', ml:1}}>
                Paula Pintos
                </Typography>
                </Typography>
            </Box>
            <Box sx={{ml:1.5, mt:3, display:'flex'}} >
                <Button sx={{fontWeight:'bold'}}>
                    Retirement
                </Button>
                <Typography sx={{mt:0.6}}>HEIST-OP-DEN-BERG,</Typography>
                <Button sx={{fontWeight:'bold'}}>
                    Belgium
                </Button>
            </Box>
            <Box sx={{width:'65%', ml:2, mt:2}}>
                <Box sx={{display:'flex',mb:2}}>
                    <PeopleIcon sx={{mr:1.5}}/>
                    <Typography >
                        Architects: 
                        <Typography sx={{display:'inline', fontWeight:'bold', color:'#4C6EB0', cursor:'pointer'}}> Atelier Kempe Thill </Typography>
                    </Typography>
                </Box>
                <Box sx={{display:'flex',mb:2}}>
                    <SquareFootIcon sx={{mr:1.5}}/>
                    <Typography >
                        Area: 
                        <Typography sx={{display:'inline', fontWeight:'bold', color:'#4C6EB0', cursor:'pointer'}}>363 </Typography>
                    </Typography>
                </Box>
                <Box sx={{display:'flex',mb:2}}>
                    <CalendarMonthIcon sx={{mr:1.5}}/>
                    <Typography >
                        Year: 
                        <Typography sx={{display:'inline', fontWeight:'bold', color:'#4C6EB0', cursor:'pointer'}}>2020 </Typography>
                    </Typography>
                </Box>
                <Box sx={{display:'flex',mb:2}}>
                    <CameraAltIcon sx={{mr:1.5}}/>
                    <Typography >
                        Photographs: 
                        <Typography sx={{display:'inline', fontWeight:'bold', color:'#4C6EB0', cursor:'pointer'}}>Ulrich Schwarz </Typography>
                    </Typography>
                </Box>
                <Box sx={{display:'flex',mb:2}}>
                    <FactoryIcon sx={{mr:1.5}}/>
                    <Typography >
                        Manufacturers: 
                        <Typography sx={{display:'inline', fontWeight:'bold', color:'#4C6EB0', cursor:'pointer'}}>Jansen, Reynaers Aluminium, Sto, </Typography>
                        AGC, Alpha, Asona, Genex, Imola Tiles, Larob , Lombardo, RLS, Reynaers, Tormax, Zorgplus
                    </Typography>
                </Box>

            </Box>
        </StyledRoot>
    </Page>
  )
}

export default SinglePost
