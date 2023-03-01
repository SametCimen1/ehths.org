import {Helmet} from 'react-helmet';
import React from 'react'
import {useEffect, useState} from 'react';
import { useNavigate  } from "react-router-dom";

export default function Dm() {
    const navigate = useNavigate();
   

    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState();
    const [selected, setSelected] = useState("");
    const [searchName, setSearchName] = useState("");
    const [filtered, setFiltered] = useState([]);


    const getGroups = async() => {
        const data = await fetch("/user/getGroups", {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
        });
        const response = await data.json();
        
        
      }
      
    
    useEffect(()=>{
        getFriends()

        // getGroups();
      },[])


      useEffect(()=>{

        const results = friends.filter((elem) => elem.name.toLowerCase().includes(searchName.toLowerCase()));
        setFiltered(results);
      },[searchName])




    const getFriends = async() => {
        const data = await fetch("/user/getFriends", {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
        });
        const response = await data.json();

        setFriends(response)
      }                      

    return (
        <div>
            
        
             <div className='text-center'>
                <h1 className='text-3xl font-bold'>DM your friends</h1>
             </div>




             <div className='mx-auto container'>


                <div>
                  <h2 className='text-xl font-medium'>Friends:</h2>
                  <input type = "text" className=' border-2 p-2 border-gray-400' placeholder = "Search by name!" onChange = {(e) => setSearchName(e.target.value)}></input>
                </div>



                <div>
                 {(friends.length > 0 ) && (searchName === "")   ?   
                  <div className='mt-5'>
   
                    {friends.map((elem) => {

                      const normalName = elem.name.replaceAll(" ", "_")
                      return(
                        <div className = "w-1/4  cursor-pointer hover:bg-gray-100 flex items-center" key = {elem.name} onClick = {() => navigate(`/connect/dm/to/${normalName}`)}>
                            {elem.ownimg ? <img className = "rounded-xl w-1/4" src = {`/img/${elem.image}`}></img> : <img src = {'Logo'}></img>}
                            <p className= 'ml-2'>{elem.name}</p>
                        </div>
                      )
                    
                    })}


                  </div>

                  :
                  <div><p>You do not have any friends. Visit <a href = "/connect/communities" className='link text-blue-500'>Communities</a> section to find some</p></div>
                 }

                 {
                   <div>
                      {((friends.length > 0 ) && (searchName !== ""))  &&

                                        <div >
                        {filtered.map((elem) => {
                          const normalName = elem.name.replaceAll(" ", "_")
                          return(
                            <div key = {elem.name} onClick = {() => navigate(`/connect/dm/to/${normalName}`)}>
                                {elem.ownimg ? <img src = {`/img/${elem.image}`}></img> : <img src = {'Logo'}></img>}
                                <p>{elem.name}</p>
                            </div>
                          )
                        
                        })}


                      </div>
                      } 
                    </div>
                 }
                 
                  {((friends.length > 0 ) && (searchName !== "") && filtered.length === 0)  && <h1>Nothing mathced</h1>}





                </div>







             </div>
           





        </div>
    )
}

