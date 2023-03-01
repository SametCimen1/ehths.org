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
       const data = await fetch("/user/getsinglegroup", {
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
        const data = await fetch("/posts/amigroupowner", {
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
            const data = await fetch("/user/groupmakepost", {
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
        const data = await fetch("/user/getgroupposts", {
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
    

    //   const updateGroupImage = async() => {
    //     const data = await fetch("/user/updategroupimage", {
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
        <div className='container mx-auto'>
            {typeof group === "undefined" ? <h1>Loading</h1> :

                <div className=''>

                    <div className='flex items-center mt-3'>
                            <div c>
                                <img className='clubPicture rounded-xl' src = {`/img/${group.groupImage}`}></img>

                                {!group.amIMember && <button>Join</button> }
                            </div>

                            <div className='ml-2'>
                                <p className='font-bold text-2xl'>g/ {group.groupName}</p>
                                <p className='font-bold text-xl'>{group.groupTitle}</p>
                                <p className='font-normal'>{group.groupName}</p>
                            </div>
                    </div>

                        {group.amIMember &&
                        <div className='mt-3'>

                            <button className='btn bg-blue-500 hover:bg-blue-700' onClick = {() => {setPost(prev => !prev);setUpdateImageContainer(false)}}>Post Something</button>
                            {amIOwner && <button className=' ml-2 btn btn-ghost border-2 border-blue-500 hover:bg-blue-500'  onClick = {() => {setUpdateImageContainer(prev => !prev); setPost(false)}}>Update Image</button>}
                            {post &&
                            <div>
                                <div className='mt-3'>
                                  
                                  <div className='flex flex-col w-1/4'>
                                    <input className='border-2 p-2 w-full' onChange = {(e) => setTitle(e.target.value)} type = "text" placeholder='title'></input>
                                    <input className='border-2 p-2 w-full mt-2' onChange = {(e) => setText(e.target.value)} type = "text" placeholder='your post'></input>
                                    <button className='btn bg-blue-500 hover:bg-blue-700 mt-2' onClick = {() => makePost()}>Post!</button>
                                  </div>

                                </div>
                            </div>
                            }
                            {updateImageContainer &&
                                                        <div>
                                                        <div >
                                                          <div >
                                                            <form   id='uploadForm' 
                                                            action='/user/updategroupimage' 
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
                            <h1 className='font-semibold mt-3'>Group posts</h1>

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

