import React from 'react'
import {useEffect, useState} from 'react';
import { useNavigate  } from "react-router-dom";
// import SmallCommunicate from './communicate/smallCommunicate';


export default function Profile() {
    const [csrf, setCsrf] = useState("")


    const getcsrf = async() => {
      const data = await fetch("/user/getcsrf", {
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
      });
      const response = await data.json();
      setCsrf(response)
    }

    useEffect(()=>{
      getcsrf()
    },[])


    const navigate = useNavigate ();
    const [user, setUser] = useState();
    const [selected, setSelected] = useState("");
    const [friendObjects, setFriendObjects] = useState([]);
    const [friends, setFriends] = useState([]);

    const [myFriendPosts, setMyFriendPosts] = useState([]);
    const [myGroupPosts, setGroupPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);


    const [friendReq, setFriendReq] = useState([]);

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
  
      useEffect(()=>{
        getData();
      },[])




    useEffect(()=>{
        getFriendRequests();
    },[])


    const getFriendRequests = async() => {
        const data = await fetch("/user/friendRequests",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
         
        const response = await data.json();
        setFriendReq(response.friendrequests);

    }


    const getFriends = async() => {
      const data = await fetch("/user/getFriends", {
        method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
      })

      const response = await data.json();
      setFriends(response)

    }


    const getUser = async(userId) => {
  
      const data = await fetch("/user/getSingleUser",{ 
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      credentials: 'include',
      body:JSON.stringify({userId})
    });
    const response = await data.json();
    const newArr = friendObjects;
    if(newArr.some((elem) => elem.id === response.id)){

    }
    else{

      newArr.push(response)
      setFriendObjects(newArr)
    }





   }

   useEffect(()=>{
    for(let i = 0; i<friendReq.length; i++){
      getUser(friendReq[i])
    }
  },[friendReq])

  const dmFriend = async(friendName) => {
    const replace = friendName.replaceAll(" ", "_")
    navigate(`/connect/dm/to/${replace}`)
  }


  const getMyPosts = async() => {
    const data = await fetch("/user/getmyposts",{
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      credentials: 'include',
    });
    const response = await data.json();

    if(typeof response.friendpost === 'undefined'||response.friendpost.length === 0){

    }
    else{
      const arr = [];
      for(let i = 0; i<response.friendpost.length; i++){
      arr.push(response.friendpost[i]);
      }  
      setMyFriendPosts(arr);
    }

    if(typeof response.friendpost === 'undefined' || response.grouppost.length === 0){

    }
    else{
      const arr = [];
      for(let i = 0; i<response.grouppost.length; i++){
        arr.push(response.grouppost[i]);
      }
      setGroupPosts(arr);  
    }




    if(typeof response.post === 'undefined' || response.post.length === 0){

    }
    else{
      const arr = [];
      for(let i = 0; i<response.post.length; i++){
        arr.push(response.post[i]);
        
      } 
      setMyPosts(arr); 
    }
    
  }

    const acceptFriend = async(id) => {
      const data = await fetch("/user/acceptfriend",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
        body:JSON.stringify({
            id
        })
      })

      const response = await data.json();
      navigate('/profile');
      
    }


    const declineFriend = async(id,type) => {
      const data = await fetch("/user/removeFriend",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
        body:JSON.stringify({
            id:id,
            type:type
        })
      })
      const response = await data.json();
      window.location.reload(true)
    }


    const loadMore = async(type, limit) => {

      const data = await fetch("/posts/getmoremypost", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
        body:JSON.stringify({
          type,
          limit
       })
      })
  


      const response = await data.json();
      if(response.length === 0){
        alert("no more post avaible")
      }
      else if(type === 'post'){
        const arr = [];
        for(let i = 0; i < myPosts.length; i++){
          arr.push(myPosts[i])
        }
        for(let i = 0; i < response.length; i++){
          arr.push(response[i])
        }
        setMyPosts(arr)
        
      }


      if(type === 'community'){
        const arr = [];
        for(let i = 0; i < myGroupPosts.length; i++){
          arr.push(myGroupPosts[i])
        }
        for(let i = 0; i < response.length; i++){
          arr.push(response[i])
        }
        setGroupPosts(arr)
      }


      if(type === 'friendposts'){
        const arr = [];
        for(let i = 0; i < myFriendPosts.length; i++){
          arr.push(myFriendPosts[i])
        }
        for(let i = 0; i < response.length; i++){
          arr.push(response[i])
        }
        setMyFriendPosts(arr)
      }

    }


    return (
      <div>
    
      {typeof user === "undefined" ? (
        <h1>Loading</h1>
      ) : (
        <main className='container mx-auto'>
          <div>
          <div>
                  
                  <div className = "text-center">
                    <h1 className = "font-bold text-3xl">Your profile</h1>
                  </div>

                  <div className = "flex justify-between mt-3 cursor-pointer" onClick={() => navigate("/profile")} >
                    
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

                </div> 
              </div>


  
          </div>
    
          <div className='mt-4'>
            <ul className='flex'>
              <li  className= {`mx-2 cursor-pointer btn  text-black ${selected === "friendRequests" ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300"}`} onClick={() => setSelected("friendRequests")}>Friend Requests</li>
              <li  className= {`mx-2 cursor-pointer btn  text-black ${selected === "editProfile" ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300"}`} onClick={() => setSelected("editProfile")}>Edit Profile</li>
              <li  className= {`mx-2 cursor-pointer btn  text-black ${selected === "friends" ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300"}`} onClick={() => {setSelected("friends");getFriends();}}>Friends</li>
              <li  className= {`mx-2 cursor-pointer btn  text-black ${selected === "posts" ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300"}`}
                onClick={() => {
                  setSelected("posts");
                  getMyPosts();
                }}
              >
                My Posts
              </li>
            </ul>
          </div>
    
          {selected === "friendRequests" && (
            <div>
              <h2 className='font-bold text-2xl'>Friend requests</h2>
    
              <div>
                {friendObjects.length > 0 ? (
                  friendObjects.map((friend) => {
                    return (
                      <div key={friend.id}>
                        {/* <a>{userId}</a> */}
                        <div>
                          {friend.ownimg ? (
                            <img
                              src={`/img/${friend.image}`}
                            ></img>
                          ) : (
                            <img src="slide1.png"></img>
                          )}
    
                          <p>{friend.name}</p>
                        </div>
                        <div>
                          <button onClick={() => acceptFriend(friend.id)}>
                            Accept
                          </button>
                          <button
                            onClick={() => declineFriend(friend.id, "request")}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1>There is nothing here</h1>
                )}
              </div>
            </div>
          )}
    
          {selected === "editProfile" && (
            <div>

    
              <div className=''>
                <h2 className='font-bold text-2xl'>Edit Profile</h2>
                <form
                  id="uploadForm"
                  action="/user/updateData"
                  method="post"
                  encType="multipart/form-data"
                >
                  <div>
                    <p className='block text-gray-500 text-sm'>Update Abot</p>
                    <div className=''>
    
                      <input
                        type="text"
                        name="about"
                        placeholder="Update About here!"
                        className='bg-gray-100 appearance-none border rounded w-1/4 py-2 px-3 text-gray-700  focus:shadow-outline'
                      ></input>
                    </div>
                  </div>
    
                  <div className='mt-2'>
                    <p className='block text-gray-500 text-sm'>Update Profile Picture</p>
                    <div>
                      <input
                        type="file"
                        name="newimg"
                        placeholder="Upload Profile Picture"
                        className='bg-gray-100 appearance-none border rounded w-1/4 py-2 px-3 text-gray-700  focus:shadow-outline'
                      ></input>
                    </div>
                  </div>
    
                  <div className='mt-2'>
                    <button className='btn bg-blue-500 hover:bg-blue-700 w-1/4'>Update!</button>
                  </div>
                </form>
              </div>
            </div>
          )}
    
          {selected === "friends" ? (
            <div>
              <div>
                <h2 className='font-bold text-2xl'>Friends</h2>
              </div>
    
              <div>
                {friends.length > 0 ? (
                  friends.map((friend) => {
                    return (
                      <div key={friend.id}>
                        {/* <a>{userId}</a> */}
    
                        <div className='w-1/4 flex  items-center'>

                          {friend.ownimg ? (
                            <img className='w-1/4 rounded-xl'
                              src={`/img/${friend.image}`}
                            ></img>
                          ) : (
                            <img src="slide1.png"  className='w-1/4 rounded-xl'></img>
                          )}
    
                          <p className='ml-3 w-2/3'>{friend.name}</p>

                          <div className='flex w-1/3'>
                            <button className='btn bg-blue-500 mr-4 hover:bg-blue-700' onClick={() => dmFriend(friend.name)}>DM</button>
                            <button className='btn bg-red-500 hover:bg-red-700'onClick={() => declineFriend(friend.id, "friend")}>Block</button>
                          </div>

                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1>no friends</h1>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
    
          {selected === "posts" ? (
            <div>
              <div>
                <h2 className='font-bold text-2xl'>My posts</h2>
              </div>
    
              <div>
              
                {myFriendPosts.length > 0 ? (
                  <div>
                    {myFriendPosts.map((elem) => {
                      return (
                        <div>
                          {/* <SmallCommunicate type = {"friendposts"}post = {elem}></SmallCommunicate>                   */}
                        </div>
                      );
                    })}
                    <button
                      onClick={() =>
                        loadMore(
                          "friendposts",
                          myFriendPosts[myFriendPosts.length - 1].id
                        )
                      }
                    >
                      Load More
                    </button>
                  </div>
                ) : (
                  <h1></h1>
                )}
              </div>
    
              <div>
                
                {myGroupPosts.length > 0 ? (
                  <div>
                    {myGroupPosts.map((elem) => {
                      return (
                        <div>
                          {/* <SmallCommunicate type = {"community"}post = {elem}></SmallCommunicate> */}
                        </div>
                      );
                    })}
                    <button
                      onClick={() =>
                        loadMore(
                          "community",
                          myGroupPosts[myGroupPosts.length - 1].id
                        )
                      }
                    >
                      Load More
                    </button>
                  </div>
                ) : (
                  <h1></h1>
                )}
              </div>
    
              <div>
                <h1>Posts</h1>
                {myPosts.length > 0 ? (
                  <div>
                    {myPosts.map((elem) => {
                      return (
                        <div>
                          {/* <SmallCommunicate type = {"post"} post = {elem}></SmallCommunicate> */}
                        </div>
                      );
                    })}
                    <button
                      onClick={() =>
                        loadMore("post", myPosts[myPosts.length - 1].id)
                      }
                    >
                      Load More
                    </button>
                  </div>
                ) : (
                  <h1></h1>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      )}
    </div>
    )
}

