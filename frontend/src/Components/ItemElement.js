import { ShoppingBasket } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';

export default function ItemElement({items , i , AddToCart}) {
  return (
    <Grid  xs={12} sm={8} md={6} lg={4} key={i}>
          <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={'http://localhost:3000/static/'+items.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {items.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {items.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {items.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {items.price}$
        </Typography>
      </CardContent>
      <CardActions>
      <div style={{display:"flex" , flexDirection:"column"  , margin:"0 auto"}}> 
          
        <IconButton 
         size="large"
          aria-label="Add to Cart"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={()=>{AddToCart({items , qty:1})}}
        >
          <ShoppingBasket  />
        </IconButton> 
        </div>
        
      </CardActions>
    </Card>
    </Grid>
  )
}
