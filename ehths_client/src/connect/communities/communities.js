import {Helmet} from 'react-helmet';
import React from 'react'
import {useEffect, useState} from 'react';
import SmallGroup from './comSmall'

export default function Groups() {
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

    const [groups, setGroups] = useState([]);
    const [myGroups, setMyGroups] = useState([]);
    const [makeYourGroup, setMakeYourGroup] = useState(false);
    let smallestMyGroupIndex = Number.MAX_SAFE_INTEGER;
    let smallestGroupIndex = Number.MAX_SAFE_INTEGER;

    const getMyGroups = async()=> {
      const data = await fetch("/user/getMyGroups", {
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
      });

      
      const response = await data.json();

      setMyGroups(response);
    }



    const getDefaultGroups = async() => {
     const data = await fetch("/user/getGroups", {
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
      });
      const response = await data.json();
      setGroups(response)
    }
    useEffect(()=>{
     getMyGroups();
     getDefaultGroups();
    },[])




    const loadMore =  async(type) => {
      if(type === 'mygroups'){
        const data = await fetch("/posts/getmoremygroups",{
          method:"PUT",
          headers: {
              'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
          body:JSON.stringify({
              type:type,
              smallestMyGroupIndex
              
          })
        })
        
        const response = await data.json();
        console.log("RESPONSE")
        if(response.length === 0){
          alert("no more community avaible")
        }
        else{
          const newArr = [];
          for(let i = 0; i< myGroups.length; i ++){
              newArr.push(myGroups[i])
          }
          for(let i =  0; i<response.length; i ++){
            newArr.push(response[i])
        }
          setMyGroups(newArr)
        }
     

      }
      else if (type === 'groups'){
        const data = await fetch("/posts/getmoregroups",{
          method:"PUT",
          headers: {
              'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
          body:JSON.stringify({
              type:type,
              smallestGroupIndex              
          })
        })
        const response = await data.json();
        if(response.length === 0){
          alert("no more post avaible")
        }
        else{
          const newArr = [];
          for(let i = 0; i< groups.length; i ++){
              newArr.push(groups[i])
          }
          for(let i =  0; i<response.length; i ++){
            newArr.push(response[i])
        }
        setGroups(newArr)
       }
        
      }
    }

    

    return (
        <div className='container mx-auto'>

             <div className='text-center'>
                <h1 className='text-3xl font-bold'>Communities!</h1>
             </div>

             <div >
                 <button className = "btn bg-gray-300 text-black" onClick = {()=> setMakeYourGroup(prev => !prev)}>Make Your Own Group!</button>
                 {makeYourGroup &&
                 <div className='w-1/3 mt-3 py-2 bg-gray-100 p-2'>
                   <form  id='uploadForm' 
                      action='/user/makegroup' 
                      method='post' 
                      encType="multipart/form-data">
                      <input type = "hidden" name ="_csrf" value={csrf}></input>

                      <div>
                          <p>Group Name</p>
                          <div>
                            <input className='border-2 p-2 w-full' name = "groupName"  type = "text" placeholder='Group Name'></input>
                          </div>
                      </div>
                   
                      <div>
                          <p>Group Title</p>
                          <div>
                              <input className='border-2 p-2 w-full' name = "groupTitle"  type = "text" placeholder='Group Title'></input>
                          </div>
                      </div>
                                        
                      <div>
                          <p>Group Description</p>
                          <div>
                            <label><i className="fas fa-edit"></i></label>
                            <input className='border-2 p-2 w-full' name = "groupDescription"  type = "text" placeholder='Group Description'></input>
                          </div>
                      </div>
                   

                      <div >
                          <p>Group Image</p>
                          <div>
                            <label><i className="far fa-images"></i></label>
                            <input className='border-2 p-2 w-full' name = "newimg"  type = "text" placeholder = "Upload Group image here"></input>
                          </div>
                      </div>


                      <div>
                        <button className='btn btn-primary mt-2'>Make a group!</button>
                      </div>
                   
                   
                    </form>
                 </div>
                 }
             </div>


             
             <div >
                        <div >


                      <div className='mt-2'>
                        <h2 className='font-semibold'>Joined Communities:</h2>
                         {/* <input type = "text" placeholder = "Search by name!"></input>
                        <i class="fas fa-caret-up"></i> */}
                        </div>
                        <div>
                         {myGroups.length >  0 ?  
                         

                         <div className=''>
                          {myGroups.map((group) => {
                            if (smallestMyGroupIndex > group.id){
                              smallestMyGroupIndex = group.id;  
                            }

                            return(
                              <SmallGroup  group = {group}></SmallGroup>
                            )
                          })}
                          <button className='btn btn-ghost mt-2' onClick = {() => loadMore("mygroups")} >Load More</button>
                         </div>
                         
                         : <h1 className = "noFriends">No groups avaible right now</h1>}
                          </div>


                        <div className='mt-2'>
                        <h2 className='font-semibold'>Latest Communities:</h2>
                        {/* <input type = "text" placeholder = "Search by name!"></input>
                        <i class="fas fa-caret-up"></i> */}
                        </div>

                        <div >
                         {groups.length >  0 ?  
                         

                         <div >
                          {groups.map((group) => {
                             if (smallestGroupIndex > group.id ){
                              smallestGroupIndex = group.id;  
                            }

                            return(
                              <SmallGroup group = {group}></SmallGroup>
                            )
                          })}
                          <button className='btn btn-ghost' onClick = {() => loadMore("groups")} >Load More</button>
                         </div>
                         
                         : <h1 className = "noFriends">No groups avaible right now</h1>}
                        </div>
{/*                 
                        <div className = {style.friends}>

                            <div className = {style.friend}>
                                <img src = {Logo}></img>
                                <p>Pre calc</p>
                            </div>

                        </div>
                     */}
                    
                    
                        </div>
                </div>

        </div>
    )
}
