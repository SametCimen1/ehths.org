import React from 'react'
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client'

import Messages from './messages';

let socket;


export default function DmTalk() {
    const chat = [];
    const [myName, setMyName] = useState("");
    const{ spacedName } = useParams();
    const [friendName, setFriendName] = useState("")
    const name = spacedName.replaceAll("_", " ")
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("")



      const getMyName = async() => {

        const data = await fetch("http://localhost:5000/user/getMyName", {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
        });
        const response = await data.json();
        setMyName(response);
      } 



    useEffect(()=>{
        socket = io("localhost:5000");
        getMyName();
    },[])

    useEffect(()=>{
        if(myName !== ""){
            let roomName;
            const comesFirst = myName.localeCompare(name);
                
            //-1 = myName comes first
            // 0 same words
            // 1 name comes first
          if(comesFirst === -1) {
              roomName = myName + name;
          }
          else if (comesFirst > 0){
              roomName = name + myName;
          }
          else{
              alert("Errer occured")
          }
   
          roomName = roomName.replaceAll(" ", "").toLowerCase();

          
    
          socket.emit('join', {friendName:name, myName:myName, roomName:roomName}, ()=>{
    
          });
    
    
          return() => {
              socket.disconnect();
              socket.off();
          }
        }
      
    },[myName])


    useEffect(()=>{
        if(typeof socket !== 'undefined'){
            socket.on('message', (message) => {

                setMessages([...messages, message])
                // if(messages.length >= 5){
                //   setMessages
                // }
                // else{
                //     const myArr = [];
                //     for(let i =0; i<messages.length; i++){
                //        myArr.push(messages[i]);
                //     }
                //     myArr.push(message)
                //     setMessages(myArr) 
                // }
                

                 
           });
        }
        else{
          
        }
 

    })


    // useEffect(()=>{
    //     if(typeof socket !== 'undefined'){
    //         socket.on('message', (message) => {
    //             setMessages([...messages, message])
    //             if(messages.length > 7){
    //                 console.log("DELETING")
    //                 setMessages([{user:"admin", text:"Deleted the chat"}, message])
    //                 // for(let i = messages.length; i>messages.length -2; i--){
    //                 //     setMessages([...messages], messages[i]);
    //                 // }
    //                 // setMessages([...messages, message])
    //             }
    //             })            
    //     }
    //     else{
    //         console.log("socket is undefined")
    //     }
 

    // },[messages])


    const sendMessage = (e) => {
      e.preventDefault();

      if(message){
          socket.emit('sendMessage', message, () => setMessage(""))
      }
    }
  const renderChat = () => {
    return messages.map(({ user, text }, index) => (
        <div key={index}>
            <h3>
                {user}: <span>{text}</span>
            </h3>
        </div>
    ))
    
}

    return (
        <div>
            <div>
                <h1 >Warning</h1>
                <p>due to a rendering problem, when you send about more than 10 message the page may start to slow down. If it happens please reload the website. Working to fix it rn!</p>
            </div>

            <div>
               {/* <Messages messages = {messages}></Messages> */}
               <div>
                {
                    (messages.length > 0 || typeof messages !== 'undefined')  ? <Messages messages = {messages}></Messages> : <h1>No messages</h1> 
                }
               </div>
            </div>
            
            <div>
                <input type = "text" placeholder='type here' onChange = {(e) => setMessage(e.target.value)} onKeyPress = {(e)=> e.key === 'Enter' ? sendMessage(e) : null}></input>
                <button onClick = {(e) => sendMessage(e)}>Send</button>
            </div>

        </div>
    )
}
