import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';


export default function CartItem({item , i}) {
  return (
    <>
        

  return (
    <Card sx={{ display: 'flex' }}>
    <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={'http://localhost:3000/static/'+item.items.image}
        alt={item.items.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' , justifyContent:"center" , alignContent:"center" , textAlign:"center" }}>
          <Typography component="div" variant="h5">
            {item.items.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {item.items.description}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' , justifyContent:"center" , alignContent:"center" , textAlign:"center" }}>
        <Typography component="div" variant="h5">
            quantity
            </Typography>
            <Typography component="div" variant="h5">
            {item.qty}
            </Typography>
        </CardContent>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' , justifyContent:"center" , alignContent:"center" , textAlign:"center" }}>
        <Typography component="div" variant="h5">
            price
            </Typography>
            <Typography component="div" variant="h5">
            {item.items.price}
            </Typography>
        </CardContent>
        </Box>
        

     
    </Card>
    </>
  )
}
