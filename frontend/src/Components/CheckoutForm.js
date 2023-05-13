import { Button } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

export default function CheckoutForm() {
    const [isprocessing, setisprocessing] = useState(false)
    const [Message, setMessage] = useState("")

    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }

        setisprocessing(true)
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url: "http://localhost:3001/success"
            }
        })

        if(error){
            setMessage(`Payment failed ${error.message}`)
            setisprocessing(false)
        }else{
            setMessage("Payment successfull")
            setisprocessing(false)
        }
    }



  return (
    <>
        <div style={{width:'60%' , margin:"50px auto"}}>
            <PaymentElement />

            <Button variant="contained" onClick={handleSubmit} style={{marginTop:"50px"}}>{isprocessing ? "Processing" : "Pay"}</Button>
            
        </div>
    </>
  )
}
