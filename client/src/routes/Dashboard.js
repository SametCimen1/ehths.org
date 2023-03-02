
import React from 'react'
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

// import Logo from '../../img/logo.png'
import { useNavigate  } from "react-router-dom";
import TextSVG from '../svgs/TextSVG';
import GroupSVG from '../svgs/GroupSVG';
import FriendsSVG from '../svgs/FriendsSVG';
import ClubSVG from '../svgs/ClubSVG';
import GradesSVG from '../svgs/GradesSVG';

import AddFriend from './AddFriend';

export default function HomeUser() {


    const navigate = useNavigate();

    const [bar, setBar] = useState(false);
    const [user,setUser] = useState("");
    const [myClubs,setMyClubs] = useState([]);
    const [mySignUps, setMySignUps] = useState([]);
    



    const getData = async() => {
      const data = await fetch("/user/getUser", {
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

    const getMyClubs = async() => {
      const data = await fetch("/getmyclubs", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
      });
      const response = await data.json();
      setMyClubs(response);
    }

    const getmyevents = async() => {
    const data = await fetch("/getmyevents", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
      });
      const response = await data.json();
      setMySignUps(response);
      console.log('value returned from events', response)
    }


    useEffect(()=>{
      getData();
      getMyClubs();
      getmyevents();
    },[])

    

    





   
    return (
        <div>

            {user !== "" ? 

            <div className='container mx-auto'>

               <div className=''>
                 <h1 className='font-bold text-2xl text-center'>Hello {user.name}. What are you up to?</h1>
               </div>

               <div className = "flex">
                 <div className = "flex w-full justify-between">
                    

                    <Link to = "/clubs/">                    
                    <div className='hover:rounded cursor-pointer mr-2 '>
                      <div className = "mt-2 card ">
                        <div className="rounded-lgflex items-center flex-col hover:border-blue-500 py-2"> 
                          <div className='fill-neutral    bg-black rounded-full w-24 h-24 flex justify-center items-center '><ClubSVG></ClubSVG></div>
                          <div className="mt-2 p-3">
                            <h5 className="text-center font-medium  text-xl ">Clubs</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>

                    <Link to = "/connect/dm">
                    <div className='hover:rounded cursor-pointer mr-2 '>
                      <div className = "mt-2 card ">
                        <div className="rounded-lg flex items-center flex-col hover:border-blue-500 py-2"> 
                          <div className='fill-neutral    bg-black rounded-full w-24 h-24 flex justify-center items-center '><TextSVG></TextSVG></div>
                          <div className="mt-2 p-3">
                            <h5 className="text-center font-medium  text-xl ">Text Friends</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>

                    <Link to = "/connect/communities">
                    <div className='hover:rounded cursor-pointer mr-2 '>
                      <div className = "mt-2 card ">
                        <div className="rounded-lg  flex items-center flex-col hover:border-blue-500 py-2"> 
                          <div className='fill-neutral    bg-black rounded-full w-24 h-24 flex justify-center items-center '><GroupSVG></GroupSVG></div>
                          <div className="mt-2 p-3">
                            <h5 className="text-center font-medium  text-xl ">Groups</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
{/*                     
                    <Link to = "/connect/makefriends">
                    <div className=' hover:rounded cursor-pointer mr-2 '>
                      <div className = "mt-2 card ">
                        <div className="rounded-lg flex items-center flex-col hover:border-blue-500 py-2"> 
                          <div className='fill-neutral    bg-black rounded-full w-24 h-24 flex justify-center items-center '><FriendsSVG></FriendsSVG></div>
                          <div className="mt-2 p-3">
                            <h5 className="text-center font-medium  text-xl ">Friends</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link> */}

                    <Link to = "https://eggharbornj.infinitecampus.org/campus/portal/eggharbor.jsp">
                    <div className=' hover:rounded cursor-pointer mr-2 '>
                      <div className = "mt-2 card ">
                        <div className="rounded-lg flex items-center flex-col hover:border-blue-500 py-2"> 
                          <div className='fill-neutral    bg-black rounded-full w-24 h-24 flex justify-center items-center '><GradesSVG></GradesSVG></div>
                          <div className="mt-2 p-3">
                            <h5 className="text-center font-medium  text-xl ">Grades</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>



                  </div>


               </div>


               {/* profileContainer */}
               <div>
                  
                  <div className = "text-center">
                    <h1 className = "font-bold text-3xl">Your Upcoming Events</h1>
                  </div>
                  <div className='flex flex-wrap'>
                    {mySignUps.length === 0 ? <div><p>You do not have any events yet!</p></div> :mySignUps.map((element) => {
                      return(
                        <div className='w-1/2 mt-4 justify-center  mx-auto '>
                          <Link>
                                  <div className="card w-10/12 bg-base-100 shadow-xl linkCard">
                                      <div className="card-body">
                                          <h2 className="card-title">{element.header}</h2>
                                          <p>{element.description}</p>
                                          <p>{element.club}</p>
                                          <div className="flex justify-between items-center">
                                          </div>
                                      </div>
                                  </div>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
{/* 
                  <div className = "flex justify-between mt-3 cursor-pointer hover:bg-gray-100 p-3" onClick={() => navigate("/profile")} >
                    
                     <div className = "w-1/4">
                       {user.ownimg ? <img className = "profileImg rounded" src = {`/img/${user.image}`}></img> : <img src = 'slide1.png'></img>}
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


                      </div>
                    </div>

                  </div>  */}




               </div>






             <div>                
                <div className = "text-center">
                  <h1 className = "font-bold text-3xl">Your Clubs</h1>

                  <div className='flex'>
                    {myClubs.map((elem) => {
                      return(
                        <div className='w-1/4 mt-4 mx-2'>
                          <Link to = {`/club/${elem.id}`}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src = {elem.picture} alt="Club Picture" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{elem.name}</h2>
                                <p className='text-left'>{elem.description}</p>
                                <div className="flex justify-between items-center">
                                    <button className="btn btn-primary">Visit</button>
                                    <p className='ml-3'>40 Members</p>
                                </div>
                            </div>
                            </div>
                          </Link>
                        </div>
                      )
                    })}

                  </div>

                
                </div>
            
            </div>


            </div> :
            
            <h1>loading</h1>
            }

            


            <div className='mt-4 mb-4 p-2'>                
            
                <div className = "text-center">
                  <h1 className = "font-bold text-3xl">Add Friends</h1>

                  <AddFriend></AddFriend>

                </div>
            
            </div>



        </div>
    )
}
