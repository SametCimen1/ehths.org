import React from 'react'
import {useState, useEffect} from 'react';
import { useNavigate  } from "react-router-dom";

export default function CommentBox({element}) {
    const navigate = useNavigate ();
    const [name, setName] = useState("")
    const [isme, setIsMe] = useState(false);
    const [img, setImg] = useState("")

    useEffect(()=>{
        getUser();
    },[])
    const getUser = async() => {
        if(element.userid){
            const data = await fetch("http://localhost:5000/user/getUserById", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
                body:JSON.stringify({
                    id: element.userid
                })
            })
            const response = await data.json();
            setImg(response.image)
            setName(response.name);
            setIsMe(response.isMe);
        }


    }


    const deleteComment = async() => {
        const data = await fetch("http://localhost:5000/posts/deletecomment", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                id: element.id
            })
        })
        if(data.status === 200){
            window.location.reload(true);
        }
    }
    return (
        <div >
              <div >
                        {isme && <i onClick = {()=> deleteComment()} className = {`${"fas fa-trash-alt"} `}></i>}
                        {img === "" ? <img alt = "user profile" className = {` ${"profileImg"}`} src = {'Logo'}></img> : <img alt = "user profile"  className = {` ${"profileImg"}`} src = {`http://localhost:5000/img/${img}`}></img> } 
                        <p onClick = {()=> navigate(`/user/${element.userid}`)}>u/{name}</p>
              </div>


                <div>
                <p >{element.text}</p>
                </div>  
       
        </div>
    )
}
