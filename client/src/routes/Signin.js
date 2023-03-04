import {Helmet} from 'react-helmet';
import React from 'react'
import {useState} from 'react'
import { useNavigate  } from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate ("");

    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const submitForm = async(e) => {
        e.preventDefault()
        console.log("CALLED")
        setResponse("Sending...")
        const data = await fetch("/auth/signin",{
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                email,
                password,
            })
        });
        
        const response = await data.json();
        
        if(data.status === 200){
            navigate('/')
            window.location.reload(true)
        }
        else{
            setResponse(response)
        }

    }


    return (

        <div className='flex justify-center items-start w-full'>
        <div className='rounded-0 border p-5 mt-5 w-full mx-2 lg:w-1/3   bg-dark shadow-xl'>
            <h1 className='text-center text-xl font-bold'>Sign In</h1>
            <form className='w-full'>
                <div class="my-3 ">
                    <label class="block text-gray-500 text-sm " for="username">
                        Username/Email
                    </label>
                    <input value = {email.value} type="email" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="email" placeholder="Username/Email" onChange = {(e) => setEmail(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label class="block text-gray-500 text-sm " for="username">
                        password
                    </label>
                    <input value = {password.value} type="password" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)} />
                </div>

                <div className = "mb-3 w-full">
                    <a href = '/' className='text-blue-500' >Forgot Password?</a>
                </div> 

                {response !== "" &&
                    <p>Message from server: <span className = {`${response === "sent a verification link to your email. Please check it" ? 'text-green-500' : 'text-red-500'}`}>{response}</span></p>
                }
                <div className='m-auto text-center w-full'>
                    <button type="submit " onClick = {(e) => {submitForm(e)}} class="w-full btn btn-primary  hover:scale-105 transition  duration-100">Sign in</button>
                </div>
            </form>
        </div>
        
    </div>   
    
    )
}
