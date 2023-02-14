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
          const data = await fetch("http://localhost:5000/user/sendFriendRequestbycode", {
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
              <section className=' container mx-auto shadow'>
                 <div  >
                  <i className="fas fa-user-plus"></i>
                 </div>

                 <div>
                   <h1 className='font-medium text-xl'>You can add your friend here quickly!</h1>
                   <h2 className='text-medium'>Enter your friend's add id</h2>
                 </div>

                 <div >
                   <input type = "text" placeholder='For example:user1234' className="bg-gray-100 appearance-none border rounded py-2 px-3 text-gray-700  focus:shadow-outline"  onChange = {(e) => setFriendCode(e.target.value)}></input>
                   <button className = "btn bg-blue-500 hover:bg-blue-700 ml-2"onClick = {(e) => addFriend(e)}>Send</button>
                 </div>


              
               </section>

        </div>
    )
}
