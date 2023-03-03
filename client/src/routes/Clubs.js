import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";

const Clubs = () => {
    const [clubs, setClubs] = useState([])

    const getClubs = async() => {
        console.log('making the call')
        const data = await fetch("/getClubs", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const res = await data.json();
        setClubs(res)
    }

    useEffect(() => {
        getClubs()
    },[])



    return (
        <div className='container mx-auto'>
            <div className='text-center'>
                <h1 className = "text-2xl font-bold">Clubs</h1>
                <p>Join clubs to earn point and build your resume. <a className = "link text-blue-500" href = "/clubbenefits">See how clubs can help you in day-to-day life</a></p>
            </div>
            <div className='flex items-center'>

                {clubs.map((elem) => {
                    return(
                        <div className='w-1/4 mt-4 mx-2'>
                            <Link to = {`/club/${elem.id}`}>
                                <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src = {elem.picture} alt="Club Picture" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{elem.name}</h2>
                                    <p>{elem.description}</p>
                                    <div className="flex justify-between items-center">
                                        <button className="btn btn-primary">Visit</button>
                                    </div>
                                </div>
                                </div>
                            </Link>
                        </div>
                    
                    )
                })}
            </div>
        </div>
    )
}

export default Clubs