
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import ItemElement from '../Components/ItemElement';

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
        <React.Fragment key={i}>
            <ItemElement items={items} i={i} AddToCart={AddToCart} />
        </React.Fragment>
        )}
      )}
      </Grid>
      </div>
    </>
  )
}
