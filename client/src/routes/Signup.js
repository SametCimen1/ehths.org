import {Helmet} from 'react-helmet';
import React from 'react'
import { useState} from 'react';


export default function Signup() {;
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [name, setName] = useState({value: false});
    const [response, setResponse] = useState("")

    const signUpRequest = async(e) => {
        setResponse("Sending...")
        e.preventDefault()
        if(email === ''){
            setResponse("email is empty")
        }
        else if (password !== passwordAgain){
            setResponse("Passwords doesnt match")
        }
        else{
            if(password.length > 6 && passwordAgain.length > 6 ){
                e.preventDefault();
                const data = await fetch("/auth/signup", {
                    method:"POST",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                      email,
                      password,
                      passwordAgain,
                      name
                    })
                })
                const response = await data.json();
                setResponse(response)            
            }
            else{
                setResponse("Password is not more than 6 character")     
            }
        
          
        }
    }
  return (
    <div className='flex justify-center items-start '>
                <div className='rounded-0 border p-5 mt-5  w-30 shadow-xl'>
                <h1 className='text-center text-xl font-bold'>Sign Up</h1>
                

                <form className='w-75 m-auto'>
                   
                   
                    <div class="my-3">
                        <label class="block text-gray-500 text-sm " for="username">
                                Email
                        </label>
                        <input value = {email} onChange = {(e) => setEmail(e.target.value)} type="email" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="email" placeholder="Email" />
                    </div>



                    <div class="mb-3">
                        <label class="block text-gray-500 text-sm " for="username">
                            Name   
                        </label>
                        <input value = {name} onChange = {(e) => setName(e.target.value)} type="password" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="password" placeholder="Name" />
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-500 text-sm " for="username">
                            Password   
                        </label>
                        <input value = {password} onChange = {(e) => setPassword(e.target.value)} type="password" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="password" placeholder="Password" />
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-500 text-sm " for="username">
                            Enter Password Again
                        </label>
                        <input value = {passwordAgain} onChange = {(e) => setPasswordAgain(e.target.value)} type="password" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="passwordAgain" placeholder="Enter Password Again" />
                    </div>

                    <div class="mb-3 form-check">
                        <a href = "/signin" className='text-blue-500 underline'>Already have an account?</a>
                    </div>


                    {response !== "" &&
                        <p >Message from server: <span className = {`${response === "sent a verification link to your email. Please check it" ? 'text-green-500' : 'text-red-500'}`}>{response}</span></p>
                    }

                    <div className='m-auto w-full text-center'>
                        <button onClick = {(e) => {signUpRequest(e)}} type="submit " class="w-full btn btn-primary">dasdsa</button>
                    </div>
                
                </form>
            </div>
        </div>   
  )
}

