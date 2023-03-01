import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate  } from "react-router-dom";


export default function SmallCommunicate({post, type}) {


    const navigate = useNavigate ();
    const [img, setImg] = useState("");
    const [name, setName] = useState();
    const [isItMine, setIsItMine] = useState(false);

    const getUser = async() => {
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
        setName(response.name)

        const myPost = await fetch("/user/myPost", {
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
        const data = await fetch("/user/getimg", {
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
        console.log("delete post requested")
        if(data.status === 200){
            window.location.reload(true)
        }
    }

    return (
               <div className='border w-1/3'>
                                        <div className='w-full' >
                                            {isItMine && <i onClick = {()=> deletePost()} className ={`${"fas fa-trash-alt"} `}></i>}

                                            <div className='w-full'  onClick = {()=> navigate(`/connect/communicate/post?post=${type}&id=${post.id}`)} >
                                                    <div className='flex items-center w-full justify-center'>
                                                        {img === "" ?<img alt = "user profile" className = {`${"profileImg rounded-full"}`} src = {'Logo'}></img>: <img  alt = "user profile"  className = {`${"profileImg rounded-full userPicture"}`} src = {`/img/${img}`}></img>}
                                                        {typeof post.groupname !== 'undefined'? <p className='font-bold ml-2'>c/{post.groupname}  u/{name}</p> : <p>u/{name}</p>}

                                                    </div>
                                            </div>
                                        </div>


                                        <div className='w-full flex justify-center flex-col  p-4  ' onClick = {()=> navigate(`/connect/communicate/post?post=${type}&id=${post.id}`)}>
                                                    <p className='font-semibold'>{post.title}</p>
                                                    <p>{post.text}</p>
                                        </div>  


                                        <div className='flex justify-around'>
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
