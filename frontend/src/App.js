
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrimarySearchAppBar from "./Screens/AppBar";
import Cart from "./Screens/Cart";
import Form from "./Screens/Form";
import Home from "./Screens/Home";
import { LoginComponent } from "./Screens/Login";
import Success from "./Screens/Success";



function App() {
  const [user, setuser] = useState(null)
  const [Carts , setCart] = useState([])

  const AddToCart = (item)=>{
    console.log(item)
    let newCart = [...Carts , item]
    setCart(newCart)
  }



  const CartCount = ()=>{
    let count = 0;
    Carts.forEach((item)=>{
      count += item.qty
    })
    return count;
  }


  useEffect(() => {
   let  verify = async ()=>{
      fetch("http://localhost:3000/verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Send Authorization Token
          Authorization:localStorage.getItem("token")
        },
      }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Success) {
          setuser(data.user)
        } else {
          localStorage.clear()
          setuser(null)
        }
      }
      )
    
    }

      let us = localStorage.getItem('user');
      if(us)
          {
            verify()
          }

      
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <PrimarySearchAppBar CartCount={CartCount} />
        <Routes>
          <Route path="/login" element={<LoginComponent  setuser={setuser}/>} />
          <Route path="/" element={<Home  user={user} setuser={setuser} AddToCart={AddToCart}/>} />
          <Route path="/cart" element={<Cart  Carts={Carts}/>} />
          <Route path="/payment" element={<Form Cart={Carts} />} />
          <Route path="/success" element={<Success />}/>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;