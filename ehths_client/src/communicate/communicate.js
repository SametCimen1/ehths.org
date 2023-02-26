import React from 'react'
import {Helmet} from 'react-helmet';
import {useEffect, useState} from 'react';

import { useNavigate  } from "react-router-dom";
import SmallCommunicate from './smallCommunicate';


export default function Communicate() {
    const navigate = useNavigate();
    let smallestId = Number.MAX_SAFE_INTEGER;
    const [selected, setSelected] = useState("friends");
    const [makePost, setMakePost] = useState("");
    const [friendPosts, setFriendPosts] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [communitiePosts, setCommunitiePosts] = useState([]);
    const [text, setText] = useState("");
    const [title, setTitle] = useState(""); 
    const [populer, setPopuler] = useState([]);
    let smallestPopuler = Number.MAX_SAFE_INTEGER;
    

    useEffect(()=>{
        getFriendPosts();
    },[])

    const getFriendPosts = async() => {
        const data = await fetch("http://localhost:5000/user/getFriendPosts", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                biggestId: undefined
            })  
            
        })
        const response = await data.json();
        setFriendPosts(response);
    }


    
    const getCommunitiePosts = async() => {
        const data = await fetch("http://localhost:5000/user/getCommunitiePosts", {
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const response = await data.json();
        setCommunitiePosts(response);
    }


    const sendFriendPost = async() => {
      if(text === "" || title === ""){
        alert("please fill in the fields")
      }
      else{
            const data  = await fetch("http://localhost:5000/user/makeFriendPost", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                text,title
            })
            })
            const response = await data.json();

            if(data.status === 200){
                window.location.reload(true)
            }
            else{
                alert(response)
            }
            
      }

      
    }


    const getMoreFriendPost = async() => {
            const data = await fetch("http://localhost:5000/user/getFriendPosts", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
                body:JSON.stringify({
                    smallestId: smallestId
                })  
                
            })
            const response = await data.json();
            if(response === 'no more post avaible'){
              alert("no more post avaible")
            }
            else{
                const arr = [];
                for(let i =0; i< friendPosts.length; i++){
                  arr.push(friendPosts[i]);
                } 
                for(let i =0; i< response.length; i++){
                    arr.push(response[i]);
                  } 

                setFriendPosts(arr);
            }

    }

    const getPopulerPosts = async() => {
        const data = await fetch("http://localhost:5000/posts/getpopuler",{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
            })  
        })
        const response = await data.json();
        setPopuler(response)
    }

    const getMorePopuler = async() => {
        const data = await fetch("http://localhost:5000/posts/getmorepopuler",{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                smallestPopuler: smallestPopuler
            })  
        })
    }



    const getCommunity = async() => {
        
        const data = await fetch("http://localhost:5000/user/getCommunities",{
                method:"GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
            });
            const response = await data.json();
            setCommunities(response);    

    }



    return (
        <div >
\


            <div > 
              <h1>Communicate!</h1>
              <h2>share what is in your mind!</h2>
            </div>




            <div>
                <ul>
                    <li onClick = {() => {setSelected("friends"); }}>Friends</li>
                    <li onClick = {() => {setSelected("communities"); getCommunitiePosts(); getCommunity();}}  >Communities</li>
                    <li onClick = {() => {setSelected("populer"); getPopulerPosts();}}  >Popular</li>
                </ul>
            </div>


            {selected === 'friends' &&
                <div >
                   <div>
                        <h1>See What your friends are saying or post your own</h1>
                        <button onClick = {() => {if(makePost === 'friends'){setMakePost("")} else{setMakePost("friends")}}} >Post What Is On your mind</button>
                   </div>

                    {
                        (makePost === 'friends') &&
                        <div >
                            <input placeholder = "type in the Title" onChange = {(e) => {setTitle(e.target.value);}}></input>
                            <input placeholder="write here" onChange = {(e) => {setText(e.target.value);}}></input>
                            <button onClick = {() => sendFriendPost()}>Post</button>
                        </div>
                    }


                   <div >
                   
                   {
                        (friendPosts.length > 0 && typeof friendPosts !== "string") ?
                        <div >
                          {friendPosts.map((post, index) => {
                              if(post.id < smallestId ){
                                smallestId = post.id
                              }

                              return(
                                  
                                 <div>

                                     <SmallCommunicate type = {'friendposts'} post = {post}></SmallCommunicate>
                                    
                                 </div>
                              )
                          })}
                                     <div >
                                        <button onClick = {()=> getMoreFriendPost()}>Load more</button>
                                     </div>
                                     
                        </div> : <h1 className = "noFriends">There is no post here yet!</h1>
                    }

                   </div>
                </div>
            }
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {selected === 'communities' &&
            <div>
                <div>
                    <h1>your friends in joined groups are saying</h1>
                </div>
                <div>
                    <div>
                      <p>Your groups</p>
                    </div>
                    {communities.length > 0 ?                   
                    <div>
                        {communities.map((element) =>{
                            return(
                                <div onClick = {() => navigate(`/connect/communitie/${element.id}`)} >
                                    <img alt = "group profile" src = {`http://localhost:5000/img/${element.groupimage}`}></img>
                                    <p>{element.groupname}</p>
                                </div>
                            )
                        })}
                     
                  </div>: 
                  <p className = "noFriends">No group Avaible right now</p>}

                </div>
                
       

                <div>
                   
                   {
                        (communitiePosts.length > 0) ?
                        <div>
                          {communitiePosts.map((post) => {
                              return(
                                 <SmallCommunicate type = {'community'} post = {post}></SmallCommunicate>
                              )
                          })}
                        </div> : <h1 className = "noFriends" >No post avaible right now</h1>
                    }

                   </div>
              </div>
           
            }

            {selected === "populer" &&
            <div>
                <div>
                  <h1>See The top 5 popular posts in your school</h1>
                </div>

                <div>
                    {populer.map((elem) => {
                        if(smallestPopuler > elem.likes){
                            smallestPopuler = elem.likes
                        }
                        return(

                           <SmallCommunicate type = {'friendpost'} post = {elem}></SmallCommunicate>
                           )
                        
                    })}

                </div>


            </div>

            }

        </div>
    )
}
