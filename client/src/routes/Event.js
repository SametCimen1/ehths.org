import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import { Link,useSearchParams  } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
const Event = () => {
  const{ id } = useParams();
  const [event, setEvent] = useState(undefined)
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState([])
  const navigate = useNavigate();
  const [points, setPoints] = useState(0)


  const getEvent = async() => {
  
    const data = await fetch("/getEvent", {
      method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
        body: JSON.stringify({
          id
        })
    })
    const res = await data.json();
    setEvent(res)

    const clubID = Number(searchParams.get('club'))
    if(clubID === null || clubID === undefined){
      alert("link is invalid")
    }
    else{
      console.log("CLUBID", res.id)
      const getPeople = await fetch('/getPeopleSignedUp', {
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
        body: JSON.stringify({
          clubID,
          eventID: res.id
        })
      })
      const resPeople = await getPeople.json();
      console.log('reqdsadsads',resPeople)
      setPeople(resPeople)
    }


  }

  const givePoint = [];

  const givePoints = async() => {
    const data = await fetch("/givepoints", {
      method:"POST",
      headers: {
      'Content-Type': 'application/json'
      },
      redirect: 'follow',
      credentials: 'include',
      body: JSON.stringify({
        givePoint,
        eventPoint:points
      })
    })

    const pastEvent = await fetch("/makepastevent", {
      method:"POST",
      headers: {
      'Content-Type': 'application/json'
      },
      redirect: 'follow',
      credentials: 'include',
      body: JSON.stringify({
        id
      })
    })
    alert('succesfully gave points, page is going to be refreshed')
    navigate('/dashboard')
    window.location.reload(true)

  }
  useEffect(() => {
    getEvent()
  },[])

  return (
    <div>
      {
      event !== undefined ?
      <div className='container mx-auto'>
        <p className='text-center font-bold text-xl mb-2'>You are signed in as admin</p>
              <div className='w-full mt-4 mx-2'>

                  <div className="card  bg-base-100 linkCard">
                      <div className="card-body">
                         <h2 className="card-title">{event.header}</h2>
                          <p>{event.description}</p>
                          <p>{event.date.substring(0, 10)}</p>
                      </div>
                   </div>

            </div>
            <div className='bg-gray-100'>
              <p className='text-center mt-3 font-medium'>People signed up</p>
              {people.length > 0 ?
              <div>
                {people.map((user) => {
                  return(
                    <div className = " w-1/2 mx-auto  flex justify-between">

                      <div className="flex items-center p-2">  
                        <div className = "w-20">
                          <img className = "rounded-xl" src = {`/img/${user.image}`}></img>
                        </div>
                        <div>
                          <p className = "ml-1">{user.name}</p>
                        </div>
                      </div>                      

                        
                      <div className = "flex items-center">
                          <label>Attanded</label>
                          <input type = "checkbox" className='mr-4 ml-1' placeholder='' onChange= {() => givePoint.push(user.id)}></input>
                          <button className = "mx-4 btn bg-red-500 hover:bg-red-700">Remove</button>
                      </div>

                    </div>
                  )
                })}
              </div>
              :
              <div>
                  <p>No one signed up yet</p>
              </div>
              }

          
            <div className='mx-auto text-center'>
              <input value = {points} onChange = {(e) => setPoints(e.target.value)} type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="points" placeholder="Name" />
            </div>
          
            <div className='mx-auto text-center'>
              <button className='mr-4 btn  bg-red-500 hover:bg-red-700'>Delete Event</button>
              <button className='btn  bg-blue-500 hover:bg-blue-700' onClick={() => givePoints()}>Give Points</button>
            </div>
          </div>


      </div>
      
  :<p className='text-center font-medium text-xlp'>We are sorry! the event you are looking for either doesn't exist or expired</p>  
    }
      </div>
  )
}

export default Event