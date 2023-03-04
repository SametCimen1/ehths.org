import Layout from '../usedMore/Layout';
import React from 'react'


import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import CommentBox from './commentBox';
import {  useSearchParams } from 'react-router-dom';

export default function BigCommunicate() {
    const [isItMine, setIsItMine] = useState(false);
    const navigate = useNavigate ();
    const [searchParams] = useSearchParams();
    const id = parseInt(searchParams.get("id"));
    const type =  searchParams.get("post");
    const [post, setPost] = useState("");
    const [name, setName] = useState([]);
    const [image, setImage] = useState([]);
    const [comment, setComment] = useState(false);
    const [cmt, setCmt] = useState("");
    const [cmtArr, setCmtArr] = useState("");


    useEffect(()=> {
       getPost();
       getComments();
       amITheOwner();
    },[])
    useEffect(()=>{
        getUser();
    }, [post]);

    
    const getPost = async() => {
        const data = await ("/user/getpostbyid", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                id: id,
                type:type
            })
        })
        const response = await data.json();
        setPost(response);
    }

    const getUser = async() => {

        if(post.userid){
            const data = await fetch("/user/getUserById", {
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
            setName(response.name);
            setImage(response.image)
        }

    }

    
    const getComments = async() => {
            const data = await fetch("/posts/getcomments", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
                body:JSON.stringify({
                    postid: id,
                    type:type
                })  
             })
             const response = await data.json();
             setCmtArr(response);
  
    }

    const amITheOwner = async() => {

        const myPost = await fetch("/user/myPost", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                userid: post.userid,
                id: id,
                type:type
            })
        })
        const myPostResponse = await myPost.json();
        setIsItMine(myPostResponse);

    }

    const makeComment = async() => {
        if(cmt === ''){ 
            alert("enter input")
        }
        else{
            const data = await fetch("/posts/makeComment", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
                body:JSON.stringify({
                    postid: id,
                    cmt:cmt,
                    userid:post.userid,
                    type:type
                })  
             })
        
             if(data.status === 200){
                 window.location.reload(true)
             }
            }
  
       }

     
    const likePost = async() => {
        if(post.didILike){
          const data = await fetch("/user/unlikepost", {
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
          const data = await fetch("/user/likepost", {
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
       
      }
      const deletePost = async() => {
        const data = await fetch("/posts/deletepost", {
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
        if(data.status === 200){
            window.location.reload(true)
        }
    }
    return (
        <div >

            {post === '' ? <h1>sorry this post doesn't exist</h1>:
            <div   >
            {isItMine && <i onClick = {()=> deletePost()} style = {{zIndex:1, fontSize:"1.3rem"}} className ={`${"fas fa-trash-alt"} `}></i>}
              <div >
                 
                   <div >
                       {image === "" ? <img  alt = "user profile " className = {` ${"profileImg"}`} src = {'Logo'}></img> : <img alt = "user profile "  className = {` ${"profileImg"}`} src = {post.image}></img>}
                       <p onClick = {()=> navigate(`/user/${post.userid}`)}>u/{name}</p>

                   </div>
                   <div >
                       <p>{post.title}</p>
                       <p>{post.text}</p>
                   </div>  
            
                  <div>
                           <div  >
                           <i onClick = {() => setComment((prev) => !prev)}  className={`${'fas fa-comments'} `}></i>
                           <p>{post.comments} comments</p>
                           </div>
                           <div style = {{zIndex:1}}  >
                              <i onClick = {() => likePost()}  className={`${"fas fa-thumbs-up"} ${post.didILike ?' style.likes ':' style.like'}`}></i>
                              <p>{post.likes} likes</p>
                           </div>
                   </div>
               </div>

                <div>
                <div>
                <h1>Comments</h1> <button onClick = {() => setComment((prev) => !prev)}>Add your comment</button>
                </div>
                {comment && <div >
                    <input onChange = {(e) => setCmt(e.target.value)} type = "text" placeholder = "type your comment here"></input>
                    <button onClick = {() => makeComment()}>Send</button>

                </div>}  
                <div >
                {cmtArr.length > 0 ? 
               
                <div >
                
                {cmtArr.map((elem) => {
                        return(
                              <div >
                            <CommentBox element = {elem}></CommentBox>
                                    
                                </div>
                            )
                            })}  
                    
                </div>


                :<h1></h1>}
                </div>
                </div>
                </div>
            
            }
              
        </div>
        
    )
}
