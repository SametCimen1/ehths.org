import {Helmet} from 'react-helmet';
import React from 'react'
import {useEffect, useState} from 'react';
import {  useParams} from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import SmallCommunicate from '../../communicate/smallCommunicate'

export default function LongGroups() {
    const [csrf, setCsrf] = useState("")
    const navigate = useNavigate ();
    const{ id } = useParams();
    const [group, setGroup] = useState();
    const[post, setPost] = useState("");
    const[updateImageContainer, setUpdateImageContainer] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [groupPosts, setGroupPosts] = useState([]);
    const [amIOwner, setamIOwner] = useState(false) 

    const getGroup = async() => {
       const data = await fetch("http://localhost:5000/user/getsinglegroup", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
        body:JSON.stringify({
            id: id
        })
       })

       const response = await data.json();

       setGroup(response)
       if(data.status === 404){
           navigate('/404')
       }
    }


    useEffect(() => {
        getGroup();
        getPosts();
        getAmIOwner()
    }, [])

    const getAmIOwner = async() => {
        const data = await fetch("http://localhost:5000/posts/amigroupowner", {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                groupId:id
            })
        })
        const response = await data.json();
        setamIOwner(response);
    }

    const makePost = async() => {
        if(title === "" || text === ""){
         alert("enter the fields")
        }
    
        else{
            const data = await fetch("http://localhost:5000/user/groupmakepost", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
                body:JSON.stringify({
                    id,
                    name:group.groupName,
                    title,
                    text
                })
            })
            if(data.status === 200){
                window.location.reload(true)
            }
            else{
                alert(await data.json())
            }
        }
    }

    const getPosts = async() => {
        const data = await fetch("http://localhost:5000/user/getgroupposts", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
                id
            })
        });

        const response = await data.json();
        setGroupPosts(response);
    }

    const getcsrf = async() => {
        const data = await fetch("http://localhost:5000/user/getcsrf", {
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
    

    //   const updateGroupImage = async() => {
    //     const data = await fetch("http://localhost:5000/user/updategroupimage", {
    //         method:"PUT",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         redirect: 'follow',
    //         credentials: 'include',
    //         body:JSON.stringify({
    //             id
    //         })
    //     })    
    //   }


    return (
        <div>
            {typeof group === "undefined" ? <h1>Loading</h1> :
                <div  >
                    <div>
                            <div>
                                <img src = {`http://localhost:5000/img/${group.groupImage}`}></img>
                                <p>g/ {group.groupName}</p>
                                {!group.amIMember && <button>Join</button> }
                            </div>

                            <div >
                                <p>{group.groupTitle}</p>
                                <p>{group.groupName}</p>
                            </div>
                    </div>

                        {group.amIMember &&
                        <div>
                            <button onClick = {() => {setPost(prev => !prev);setUpdateImageContainer(false)}}>Post Something</button>
                            {amIOwner && <button onClick = {() => {setUpdateImageContainer(prev => !prev); setPost(false)}}>Update Image</button>}
                            {post &&
                            <div>
                                <div >
                                  <div>
                                    <input  onChange = {(e) => setTitle(e.target.value)} type = "text" placeholder='title'></input>
                                    <input onChange = {(e) => setText(e.target.value)} type = "text" placeholder='your post'></input>
                                    <button onClick = {() => makePost()}>Post!</button>
                                  </div>
                                </div>
                            </div>
                            }
                            {updateImageContainer &&
                                                        <div>
                                                        <div >
                                                          <div >
                                                            <form   id='uploadForm' 
                                                            action='http://localhost:5000/user/updategroupimage' 
                                                            method='post' 
                                                            encType="multipart/form-data">
                                                            <input type = "hidden" name ="_csrf" value={csrf}></input>
                                                            <input type = "hidden" name ="groupid" value={id}></input>
                                                                <div>
                                                                 <p>Update group image</p>
                                                                <input type = "file" name = "newimg" placeholder = "Upload Group image here"></input>
                                                                </div>
                                                                <input type = "submit"></input>
                                                            </form>
                                                          </div>
                                                        </div>
                                                    </div>
                            }
                        </div>
                        }

                        <div>
                            <h1>Group posts</h1>

                            {groupPosts.map((elem) => {
                                return(
                                    <div>
                                        <div >
                                            <SmallCommunicate type = {"community"} post = {elem} ></SmallCommunicate>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                </div>

              
            }
        </div>
    )
}
