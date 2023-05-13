import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import CheckoutForm from '../Components/CheckoutForm'

export default function Form({Cart}) {
    console.log(Cart)


    useEffect(() => {
        if(Cart.length === 0){
            window.location.href = "/"
        }
        
    }, [])
    let Cartt = Cart.map((item , i)=>{
        console.log(item)
        return(
          { items: item.items._id , qty:1 , price:item.items.price }
        )
      })

     
    const [Stripepromise, setStripepromise] = useState(null)
    const [ClientSecret, setClientSecret] = useState("")

    useEffect(() => {
        fetch("http://localhost:3000/config", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setStripepromise(loadStripe(data.publishableKey))
            }
            )
    }, [])


    useEffect(() => {
        fetch("http://localhost:3000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Cartt }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setClientSecret(data.clientSecret)
            }
            )
    }, [])


  return (
    <>
       {ClientSecret && Stripepromise ? (
        <Elements stripe={Stripepromise} options={{clientSecret:ClientSecret}}>
         <CheckoutForm />
       </Elements>
       ):<>
        Loading...
       </>}
    </>
  )
}
