import {Helmet} from 'react-helmet';
import React from 'react'
import AddFriend from './addFriend'
import {useState, useEffect} from 'react'
import SmallCommunicate from '../communicate/smallCommunicate'

export default function MakeFriends() {
    const [subject, setSubject] = useState("");
    const [paragraph, setParagraph] = useState("");
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);
    let smallestId = Number.MAX_SAFE_INTEGER;
    

    const getDefaultPosts = async() => {
       const data = await fetch("/user/getDefaultPosts", {
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
        body: JSON.stringify({
          smallestId:undefined
        })
       })

       const response = await data.json();
       setPosts(response)


    }


    const makePost = async() => {
        if(subject === '' || paragraph === ''){
          setError("please fill in the inputs")
        }
        else{
            setError("")
            const data = await fetch("/user/makePost", {
                method:"POST",
              headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              credentials: 'include',
              body:JSON.stringify({
            subject,
            paragraph,
        })
             });

             const response = await data.json();
             setError(response)
             if(response === "Successfully added a post"){
                window.location.reload(true);
             }

        }

    } 

    useEffect(()=>{
     getDefaultPosts();
    },[])

    const getMoreFriendPost = async() => {

          const data = await fetch("/user/getDefaultPosts", {
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
              for(let i =0; i< posts.length; i++){
                arr.push(posts[i]);
              } 
              for(let i =0; i< response.length; i++){
                  arr.push(response[i]);
                } 

                setPosts(arr);
          }

  }


    
    return (
        <div>


            <div>
              <h1>Make a Post to let people find you!</h1>
              {error !== '' && <h1 >{error}</h1>}
              <div>
                <input placeholder = "type in the subject" onChange = {(e) => {setSubject(e.target.value);}}></input>
                <input placeholder="write your post here" onChange = {(e) => {setParagraph(e.target.value);}}></input>
                <button onClick = {() => makePost()}>Post</button>
              </div>
            </div>


            <div >
                <h1 >Recent Posts</h1>
                {console.log("post is ", posts)}
                {posts.length > 0 && typeof posts !== "string" ?
                
                <div >
                  {posts.map((elem) => {
                    if(elem.id < smallestId){
                      smallestId = elem.id;
                    }
                     return( <SmallCommunicate type = {'post'} post = {elem} key = {elem.id}></SmallCommunicate> )
                  })}
                  <div>
                                        <button onClick = {()=> getMoreFriendPost()}>Load more</button>
                  </div>
                </div>
                
                
                
                : <h1 className = "noFriends">No post Avaible Right now</h1>}
            </div>

            <h1 >Add Friend with their add id</h1>
             <AddFriend></AddFriend>
            <div>
              
            </div>
        </div>
    )
}
