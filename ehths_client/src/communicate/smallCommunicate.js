import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate  } from "react-router-dom";


export default function SmallCommunicate({post, type}) {


    const navigate = useNavigate ();
    const [img, setImg] = useState("");
    const [name, setName] = useState();
    const [isItMine, setIsItMine] = useState(false);

    const getUser = async() => {
        const data = await fetch("http://localhost:5000/user/getUserById", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                id: post.userid
            })
        })
        
        const response = await data.json();
        setName(response.name)

        const myPost = await fetch("http://localhost:5000/user/myPost", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                userid: post.userid,
                id: post.id,
                type:type
            })
        })
        const myPostResponse = await myPost.json();
        setIsItMine(myPostResponse);

    }
    const getImg = async() => {
        const data = await fetch("http://localhost:5000/user/getimg", {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
          body:JSON.stringify({
              userid:post.userid
          })
        });
  
        const response = await data.json();
        if(response.ownimg === false){
          setImg("")
        }
        else{
          setImg(response.image)
        }
        
      }
    const likePost = async() => {
        

        if(post.didILike){
            const data = await fetch("http://localhost:5000/user/unlikepost", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
                body:JSON.stringify({
                    id: post.id,
                    type:type
                })  
            })
            window.location.reload(true);
          }
          else{
            const data = await fetch("http://localhost:5000/user/likepost", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
                body:JSON.stringify({
                    id: post.id,
                    type:type,
                })
            })
       }
     
        window.location.reload(true); 
    
     
    }

    useEffect(()=>{
        getUser();
        getImg();
    },[])
    

    const deletePost = async() => {
        const data = await fetch("http://localhost:5000/posts/deletepost", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                id: post.id,
                type:type,
            })
        })
        console.log("delete post requested")
        if(data.status === 200){
            window.location.reload(true)
        }
    }

    return (
               <div>
                                        <div >
                                        {isItMine && <i onClick = {()=> deletePost()} className ={`${"fas fa-trash-alt"} `}></i>}

                                        <div  onClick = {()=> navigate(`/connect/communicate/post?post=${type}&id=${post.id}`)} >
                                                <div >
                                                    {img === "" ?<img alt = "user profile" className = {`${"profileImg"}`} src = {'Logo'}></img>: <img  alt = "user profile"  className = {`${"profileImg"}`} src = {`http://localhost:5000/img/${img}`}></img>}
                                                    {typeof post.groupname !== 'undefined'? <p>c/{post.groupname}  u/{name}</p> : <p>u/{name}</p>}

                                                </div>
                                        </div>
                                        </div>
                                        <div  onClick = {()=> navigate(`/connect/communicate/post?post=${type}&id=${post.id}`)}>
                                                    <p>{post.title}</p>
                                                    <p>{post.text}</p>
                                        </div>  


                                        <div >
                                                        <div onClick = {()=> navigate(`/connect/communicate/post?post=${type}&id=${post.id}`)} >
                                                          <i  className={`${'fas fa-comments'} `}></i>
                                                          <p>{post.comments} comments</p>
                                                        </div>
                                                          <div >
                                                          <i onClick = {() => likePost()}  className={`${"fas fa-thumbs-up"} ${post.didILike ? 'style.likes' : 'style.like'}`}></i>
                                                            {/* {post.didILike ? <p className = {style.liked}>{post.likes} likes</p> : <p className = {style.like}> {post.likes} likes</p> }
                                                            {post.didILike ? <p className = {style.liked}>{post.likes} likes</p> : <p className = {style.like}> {post.likes} likes</p> } */}
                                                           <p>{post.likes} likes</p>
                                                        </div>
   
                                        </div>


                </div>

    )
}
