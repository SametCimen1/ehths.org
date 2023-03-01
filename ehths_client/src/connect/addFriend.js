import React from 'react'
import {useState} from 'react';

export default function AddFriend() {
    
    const [friendCode, setFriendCode] = useState("");

    const addFriend = async(e) => {
        e.preventDefault();
  
        if(friendCode === ""){
         alert("Please enter a code")
        }
        else{
          const data = await fetch("/user/sendFriendRequestbycode", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                friendCode
            })
          });
          const response = await data.json();
          alert(response)
        }
  
      }

    return (
        <div>
              <section className>
                 <div className>
                  <i className="fas fa-user-plus"></i>
                 </div>

                 <div className>
                   <h1>You can add your friend here quickly!</h1>
                   <h2>Enter your friend's add id</h2>
                 </div>

                <div className>
                   <input type = "text" placeholder='For example:user1234'  onChange = {(e) => setFriendCode(e.target.value)}></input>
                   <button onClick = {(e) => addFriend(e)}>Send</button>
                 </div>


              
               </section>

        </div>
    )
}
