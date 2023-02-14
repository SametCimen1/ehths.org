
import React from 'react'
import {useState, useEffect} from 'react';

// import Logo from '../../img/logo.png'
import { useNavigate  } from "react-router-dom";
import TextSVG from '../svgs/TextSVG';
import GroupSVG from '../svgs/GroupSVG';
import FriendsSVG from '../svgs/FriendsSVG';

import AddFriend from './AddFriend';

export default function HomeUser() {


    const navigate = useNavigate();

    const [bar, setBar] = useState(false);
    const [user,setUser] = useState("");

    



    const getData = async() => {
      const data = await fetch("http://localhost:5000/user/getUser", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
      });
      const response = await data.json();
      setUser(response);
    }

    useEffect(()=>{
      getData();
    },[])

    

    





   
    return (
        <div>

            {user !== "" ? 

            <div className='container mx-auto'>

               <div className=''>
                 <h1 className='font-bold text-2xl'>Hello {user.name}. What are you up to?</h1>
               </div>

               <div className = "flex">
                 <div className = "flex w-full justify-around">
                    
                    <div className='hover:rounded cursor-pointer mr-2 '>
                      <div className = "mt-2 card ">
                        <div className="rounded-lg hover:border-blue-500 py-2"> 
                          <div className='fill-neutral mx-auto   mt-1'><TextSVG></TextSVG></div>
                          <div className="mt-2 p-3">
                            <h5 className="text-center font-medium  text-xl ">Text Friends</h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='hover:rounded cursor-pointer mr-2 '>
                      <div className = "mt-2 card ">
                        <div className="rounded-lg hover:border-blue-500 py-2"> 
                          <div className='fill-neutral mx-auto   mt-1'><GroupSVG></GroupSVG></div>
                          <div className="mt-2 p-3">
                            <h5 className="text-center font-medium  text-xl ">Groups</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className=' hover:rounded cursor-pointer mr-2 '>
                      <div className = "mt-2 card ">
                        <div className="rounded-lg hover:border-blue-500 py-2"> 
                          <div className='fill-neutral mx-auto   mt-1'><FriendsSVG></FriendsSVG></div>
                          <div className="mt-2 p-3">
                            <h5 className="text-center font-medium  text-xl ">Friends</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

               </div>


               {/* profileContainer */}
               <div>
                  
                  <div className = "text-center">
                    <h1 className = "font-bold text-3xl">Your profile</h1>
                  </div>

                  <div className = "flex justify-around mt-3 cursor-pointer" onClick={() => navigate("/profile")} >
                    
                     <div className = "w-1/4">
                       {user.ownimg ? <img className = "profileImg rounded" src = {`http://localhost:5000/img/${user.image}`}></img> : <img src = 'slide1.png'></img>}
                     </div>
                     

                     <div className = "">
                      
                       <div className = "">
                          <div>
                            <h2 className = "font-medium text-xl">Name and Email</h2>
                          </div>


                          <div >
                            <h3>name: {user.name}</h3>
                            <h3>email: {user.email}</h3>
                            <h3>Your add id is: {user.add_id}</h3>
                          </div>
                       </div>




                      <div className = "max-w-md">
                          
                        <div className = "">
                          <h2 className = "font-medium text-xl mt-3">About</h2>
                        </div>

                        <div>
                          {user.about !== "" ?<h3>{user.about}</h3> : <h3>none</h3>}

                        </div>
                        <p className = "text-gray-500 text-sm">You can change about section and your personal information by clicking this section </p>

                      </div>
                    </div>

                  </div> 




               </div>






             <div>                
                <div className = "text-center">
                  <h1 className = "font-bold text-3xl">Your Clubs</h1>
                </div>
            
            </div>


            </div> :
            
            <h1>loading</h1>
            }

            


            <div className='mt-4'>                
            
                <div className = "text-center">
                  <h1 className = "font-bold text-3xl">Add Friends</h1>

                  <AddFriend></AddFriend>

                </div>
            
            </div>



        </div>
    )
}
