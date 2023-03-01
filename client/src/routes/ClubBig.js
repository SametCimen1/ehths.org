import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import { Link } from "react-router-dom";

const ClubBig = () => {

    const{ id } = useParams();
    const [club, setClub] = useState('');
    const [alreadyIn, setAlreadyIn] = useState(false);
    const [events, setEvents] = useState([]);
    const [clubIDs,setClubIDs] = useState([]);
    const [createEventDrop, setCreateEventDrop] = useState(false)

    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventDate, setEventDate] = useState('')


    const getInfo = async() => {
        const data = await fetch("/getClubInfo", {
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
        const res = await data.json();
        setClub(res)
    }

    const getIsIn = async() => {
        const data = await fetch("/amiin", {
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
        const res = await data.json();
        setAlreadyIn(res)

    }

    const getEvents = async() => {
        const data = await fetch("/getevents", {
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

        const res = await data.json();
        setEvents(res)



        const data2 = await fetch("/getIdofSignUps", {
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
        const res2 = await data2.json();
        setClubIDs(res2)
        console.log("RES2",res2)
    }

    useEffect(() => {
        getInfo();
        getIsIn();
        getEvents();
    },[])

    const joinGroup = async(id) => {
        const data = await fetch("/joinClub", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
              id
            })
        })
    }




    const signupEvent = async(eventID, eventHeader, eventDescription) => {
        console.log("event id", eventID)
        const data = await fetch("/signupEvent", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
              id:eventID,
              clubid: id,
              header:eventHeader,
              description:eventDescription
            })
        });
        const res = await data.json();
        if(res === true){
            window.location.reload(true)
        }else{
            window.location.reload(true)
        }
    }
    
    const signOut = async(eventID) => {
        console.log("event id", eventID)
        const data = await fetch("/signOutEvent", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
              id:eventID,
              clubid: id,
            })
        });
        const res = await data.json();
        if(res === true){
            window.location.reload(true)
        }else{
            window.location.reload(true)
        }
    }

    const createEvent = async() => {
        console.log("EVENTS")
        console.log(eventDate)
        console.log(eventName)
        const data = await fetch("/createClubEvent", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body:JSON.stringify({
              clubid: id,
              eventName,
              eventDescription,
              eventDate
            })
        });
        const res = await data.json();
        if(data.status === 200){
            window.location.reload(true); 
        }
        

    }
    
    return (
        <div className='container mx-auto'>

                <div className='mb-5'>   
                    <div className='flex py-5 items-center'>

                        <div className=''>
                            <div class="avatar ">
                                <div class="rounded">
                                    <img className = "clubPicture " src= {club.picture} />
                                </div>
                            </div>
                        </div> 
                        <div className='flex flex-col justify-center items-align  ml-3 max-w-2xl'>
                                <h1 className='font-bold text-4xl text-center md:text-left'>{club.name}</h1>
                                <p>{club.description}</p>
                        </div>

                    </div>


                <div>
                    <div className='w-1/2'>
                        <button className='mr-2  border-2 border-blue-500 p-2 rounded w-1/3' onClick = {() => setCreateEventDrop(!createEventDrop)}>Create an Event</button>
                        {!alreadyIn ? <button className="btn btn-primary w-1/3" onClick = {() => joinGroup(club.id)}>Join</button> : <button className='border-2 border-red-500 p-2 rounded w-1/3'>Leave</button>}
                    </div>
                    
                    <div>
                        {createEventDrop && 
                        <div className='w-1/3 mt-3 py-2 bg-gray-100 p-2'>
                            <div className=''>
                                <input className='border-2 p-2 w-full' type = "text" placeholder='Event Name' onChange = {(e) => setEventName(e.target.value)}></input>
                            </div>
                            <div className='mt-2'>
                                <input className='border-2 p-2 w-full' type = "text" placeholder='Event Description'  onChange = {(e) => setEventDescription(e.target.value)}></input>
                            </div>
                            <div className='mt-2'>
                                <input className='border-2 p-2 w-full' type = "date" placeholder='Event Date'  onChange = {(e) => setEventDate(e.target.value)}></input>
                            </div>
                            
                            <button className='mt-2  border-2 border-blue-500 p-2 rounded w-full' onClick = {() => createEvent()}>Create an Event</button>
                        </div>}
                    </div>
                    
                <div className='flex items-stretch'>
                        {events.length>0 ?
                        events.map((element) => {
                            return (
                                <div className='w-1/4 mt-4 mx-2'>
                                   
                                            <div className="card  bg-base-100 shadow-xl">
  
                                                    <div className="card-body">
                                                        <Link to = {`/event/${element.id}?club=${id}`}>
                                                            <h2 className="card-title">{element.header}</h2>
                                                            <p className='mt-2'>{element.description}</p>
                                                            <p className='text-sm mt-3'>{element.date.substring(0,10)}</p>
                                                            <div className="flex justify-between items-center">
                                                            
                                                            </div>
                                                        </Link>
                                                        {(clubIDs.length>0) && clubIDs.includes(element.id) ? <button className="btn btn-error w-1/3" onClick={() => signOut(element.id)}>Sign Out</button> : <button className="w-1/3 btn btn-primary" onClick={() => signupEvent(element.id, element.header, element.description)}>Sign up</button>}
                                                    </div>

                                               
                                            </div>
                                    
                                    
                                </div>
                            )
                        })
                                            :
                        <div>
                            <h1>No event yet</h1>
                        </div>
                    
                    }
                    

                    </div>
                </div>
            </div>
    </div>
    )
}

export default ClubBig