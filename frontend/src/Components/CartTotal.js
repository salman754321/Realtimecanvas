import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

export default function CartTotal({Carts}) {
  return (
    <>
    <Card sx={{ display: 'flex' , justifyContent:"space-between" }}>
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <CardContent sx={{ flex: '1 0 auto' , justifyContent:"center" , alignContent:"center" , textAlign:"center" }}>
       
        <Typography component="div" variant="h5">
          Total Items : {Carts.reduce((a, c) => a + c.qty, 0)}
        </Typography>
      </CardContent>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' , justifyContent:"center" , alignContent:"center" , textAlign:"center" }}>
     
          <Typography component="div" variant="h5">
          Total Amount : {Carts.reduce((a, c) => a + c.qty * c.items.price, 0)}
          </Typography>
      </CardContent>
      </Box>
  </Card>

  <Button variant="contained" style={{marginTop:"50px"}}>Checkout</Button>
  </>
  )
}
