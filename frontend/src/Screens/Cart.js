
import { Divider, Typography } from '@mui/material'
import React from 'react'
import CartItem from '../Components/CartItem'
import CartTotal from '../Components/CartTotal'

export default function Cart({Carts}) { 

  let Cartt = Carts.map((item , i)=>{
    console.log(item)
    return(
      { items: item.items._id , qty:1 }
    )
  })

  console.log(Cartt)
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

      <CartTotal Carts={Carts}/>
    </div>
  )
}
