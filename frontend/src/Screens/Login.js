import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';

export const LoginComponent = ({setuser}) => {
const navigate = useNavigate()
const [Email, setEmail] = useState("")
const [password, setpassword] = useState("")

    useEffect(() => {
        let us = JSON.parse(localStorage.getItem("user"))
        if(us){
           setuser(us)
           navigate("/") 
        }
    }, [])

    const login = (e)=>{
        e.preventDefault()
        if (Email === "" || password === "") {
            alert("Please fill all the fields");
            return;
        }

        let user = {
            email:Email,
            password:password
        }

        fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.Success) {

            localStorage.setItem("user" , JSON.stringify(user))
            localStorage.setItem("token" , data.token)
            setuser(data.user)
            navigate("/")
    }else{
        alert(data.message)
    }
        }
    )}
    const [mode, setmode] = useState('login');
    function toggleMode() 
    {
        var newMode = mode === 'login' ? 'signup' : 'login';
        setmode(newMode);
    }
        return (
            <div>
                <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
                <section className={`form-block form-block--is-${mode}`}>
                    <header className="form-block__header">
                        <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
                        <div className="form-block__toggle-block">
                            <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                            <input id="form-toggler" type="checkbox" onClick={()=>toggleMode()} />
                            <label htmlFor="form-toggler"></label>
                        </div>
                    </header>
                    <LoginForm mode={mode} Email={Email} setEmail={setEmail} password={password} setpassword={setpassword}  login={login} />
                </section>
            </div>
        )
    }




