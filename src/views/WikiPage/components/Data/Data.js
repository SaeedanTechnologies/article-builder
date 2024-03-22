import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardData } from './components/CardData';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
const CreatePinPage = () => {


  return (
    <div>
    <Grid container spacing={2}>
      {CardData.map((val, ind) => {
        return (
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 140 }} image={val.image} title={val.title} />
              <CardContent style={{ height: '100%' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {val.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4, 
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {val.desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant='outlined'>Share</Button>
                <Button size="small" variant='contained' className='bg-pink-600'
                component={Link}
                to='/categories'
                >Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  </div>
  );
};

export default CreatePinPage;
