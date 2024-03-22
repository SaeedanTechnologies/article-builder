import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const Bottom = () => {
  return (
    <div>
        <Box sx={{display:'flex',}}>
      <Box sx={{width:'65%'}}>
      <Typography
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3, 
                WebkitBoxOrient: 'vertical',
            }}
            >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
            </Typography>
            <Box sx={{height:'150px', width:'150px', display:'flex'}}>
                <img src="/assets/images/img1.webp" style={{marginRight:3, border:'1px solid #000'}} />
                <img src="/assets/images/img2.webp" style={{marginRight:3, border:'1px solid #000'}} />
                <img src="/assets/images/img3.jpg" style={{marginRight:3, border:'1px solid #000'}} />
                <img src="/assets/images/img4.jpg"  style={{marginRight:3, border:'1px solid #000'}}/>
            </Box>
            <Typography
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical',
            }}
            >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
            </Typography>
      </Box>
      <Divider sx={{borderWidth:'1px', height:'300px'}} orientation='horizontal'/>
      <Box sx={{width:'35%',  overflowY: "scroll", maxHeight: "300px", p:1 }}>
        <Typography variant='h6' textAlign="center" sx={{mb:1}}>
            Similar Posts
        </Typography>
        <Card sx={{ maxWidth: 345, mb:2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/assets/images/img3.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Project 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is the content of the project 1
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/assets/images/img4.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Project 2
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </Box>
        </Box>
    </div>
  )
}

export default Bottom
