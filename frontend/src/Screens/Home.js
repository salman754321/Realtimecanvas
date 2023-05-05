
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import {  Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';

export default function Home({setuser , user , AddToCart}) {

  const [Items, setItems] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(!user){
            navigate("/login")
        }else{
            // Api Call to fetch data 
            fetch("http://localhost:3000/api/item/getAllItems", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.Success) {
                        setItems(data.items)
                    } else {
                        alert(data.message)
                    }
                }
                )

        }
    }, [user , navigate])
  return (
    <>  
      <div style={{display:"flex" , flexDirection:"column" , width:"80%" , margin:"100px auto"}}> 
      <Typography  fontSize={50} color={"black"} textAlign={"center"}>Welcome to our Store</Typography>

      <Grid container spacing={3}>
      {Items && Items.map((items , i)=>{
        return(
          <>
          <Grid item xs={12} sm={8} md={6} lg={4} key={i}>
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
    </>
        )}
      )}
      </Grid>
      </div>
    </>
  )
}
