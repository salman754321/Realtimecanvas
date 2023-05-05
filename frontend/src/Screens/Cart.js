import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import CartItem from '../Components/CartItem'

export default function Cart({Carts}) {
  return (
    <div style={{display:"flex" , flexDirection:"column" , width:"60%" , margin:"100px auto"}}> 
    <Typography variant="h4" style={{textAlign:"center" , color:"#000"}}>Cart</Typography>
    <div style={{overflow:"scroll" , maxHeight:"500px"}}>
    {Carts.map((item , i)=>{
        return(
            <CartItem item={item} key={i}/>
        )
    })}

    </div>
       <div style={{marginTop:"50px"}}> </div>
      <Divider variant="middle" style={{color:"#000" , border:"1px solid"}} />


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
    </div>
  )
}
