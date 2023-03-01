import {Helmet} from 'react-helmet';
import React from 'react'
import { useState} from 'react';


export default function Signup() {;
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [read, setRead] = useState({value: false});
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
                <h1 className='text-center text-xl font-bold'>Kayit Ol</h1>
                

                <form className='w-75 m-auto'>
                   
                   
                    <div class="my-3">
                        <label class="block text-gray-500 text-sm " for="username">
                                Email
                        </label>
                        <input value = {email} onChange = {(e) => setEmail(e.target.value)} type="email" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="email" placeholder="Email" />
                    </div>


                    <div class="mb-3">
                        <label class="block text-gray-500 text-sm " for="username">
                            Şifre   
                        </label>
                        <input value = {password} onChange = {(e) => setPassword(e.target.value)} type="password" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="password" placeholder="Şifre" />
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-500 text-sm " for="username">
                            Şifre’yi tekrar gir
                        </label>
                        <input value = {passwordAgain} onChange = {(e) => setPasswordAgain(e.target.value)} type="password" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="passwordAgain" placeholder="Şifre’yi tekrar gir" />
                    </div>

                    <div class="mb-3 form-check">
                        <a href = "/signin" className='text-blue-500 underline'>Already have an account?</a>
                    </div>

                    <div class="mb-3 form-check">
                        <input  value = {read.value} onChange = {(e) => setRead({value:!read.value})} type="checkbox" class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1"><a href = "/" className='link text-blue-500'>Kullanım Koşullarını</a> ve <a href = "/" className='link  text-blue-500'>Gizlilik Politikasını</a> kabul ediyorum.</label>
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

