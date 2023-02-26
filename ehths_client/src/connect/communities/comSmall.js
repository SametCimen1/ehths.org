import React from 'react'
import { useNavigate  } from "react-router-dom";
import { Link } from "react-router-dom";



export default function SmallGroups({group}) {

    const joinGroup = async() => {
        const data = await fetch("http://localhost:5000/user/joinGroup", {
           method:"POST",
           headers: {
               'Content-Type': 'application/json'
           },
           redirect: 'follow',
           credentials: 'include',
           body:JSON.stringify({
               id: group.id
           })
        })
        
        if(data.status === 503 || data.status === 500){
            const response = await data.json();
            alert(response)
        }
        else if(data.status === 200){
            window.location.reload(true)
        }   


       }
   





    const navigate = useNavigate();
    return (
        <div >                
            
            <div className='w-1/12 mt-4 mx-2'>
                <Link to = {`http://localhost:3000/communitie/${group.id}`}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                    <figure>{group.groupimage === "" ? <img src = {'Logo'}/> : <img className='w-1/2 bg-info'  src = {`http://localhost:5000/img/${group.groupimage}`}></img>}</figure>
                    <div className="card-body">
                        <h2 className="card-title">{group.groupTitle}</h2>
                        <p>{group.groupDescription}</p>
                        <div className="flex justify-between items-center">
                                {group.didIJoin ? "":<button onClick = {() => joinGroup()}>Join</button>}
                            <p className='ml-3'>{group.memberCount} Members</p>
                        </div>
                    </div>
                    </div>
                </Link>
            </div>

        </div>
    )
}
