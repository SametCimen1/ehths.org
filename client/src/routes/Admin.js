import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import TrophySVG from '../svgs/TrophySVG';

const Admin = () => {
    const [user, setUser] = useState(undefined);
    const [clubs, setClubs] = useState(undefined);
    const [clubsHide, setClubsHide] = useState(false);
    const [createClubOpen, setCreateClubOpen] = useState(false);
    const [studentHide, setStudentHide] = useState(false)
    const [students, setStudents] = useState(undefined)


    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');
    const [IMGurl, setIMGurl] = useState('');


    const getUser = async() => {
        const data = await fetch("/user/getUser", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
          });
          const response = await data.json();
          console.log("HERE CURRENLTY", response)
          setUser(response);
          
        
          const data2 = await fetch("/getClubs")
          const res2 = await data2.json();
          setClubs(res2);

                  
          const data3 = await fetch("/getEverything")
          const res3 = await data3.json();
          setStudents(res3);



    }


    const createClub = async() => {
        if(clubName === '' || clubDescription === '' || IMGurl === ''){
            alert("Please fill in the input fields")
        }else{  
            const data = await fetch('/createClub', {
                method:"POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include',
                body: JSON.stringify({
                    clubName, 
                    clubDescription,
                    IMGurl
                })
            });

        }
    }


    useEffect(() => {
        getUser()
    },[])
    
    return (
        <div>
            
            {user === undefined ? <div>Loading</div>:    
                <div>
                    {user.role === 'admin' ? 
                    <div className='container mx-auto'>
                        <div>
                            <h1 className='text-xl font-bold text-center'>Welcome {user.name}, you are in the admin panel</h1>
                        </div>

                        <div>
                            <div className='text-center justify-center flex items-center mt-10'>
                                <p className='font-bold text-xl'>School Clubs</p>
                                <button className='p-1 px-2 rounded-xl bg-gray-200 hover:bg-gray-400 ml-3' onClick = {() => setClubsHide(!clubsHide)}>{clubsHide === false ? 'Hide' : 'Show' }</button>
                            </div>

                            <div className='flex wrap'>
                                {(clubs !== undefined && clubsHide === false) && clubs.map((elem) => {
                                    return(
                                        <div className='min-w-1/4 mt-4 mx-2'>
                                            <Link to = {`http://localhost:3000/club/${elem.id}`}>
                                                <div className="card w-96 bg-base-100 shadow-xl">
                                                <figure><img className='clubPicture' src = {elem.picture} alt="Club Picture" /></figure>
                                                <div className="card-body">
                                                    <h2 className="card-title">{elem.name}</h2>
                                                    <p>{elem.description}</p>
                                                    <div className="flex justify-between items-center">
                                                        <button className="btn btn-primary">Visit</button>
                                                        <p className='ml-3'>40 Members</p>
                                                    </div>
                                                </div>
                                                </div>
                                            </Link>
                                        </div>
                                    
                                    )
                                })}


                            </div>

                            <button className='btn border-2 border-blue-500 btn-ghost mt-10' onClick={() => setCreateClubOpen(!createClubOpen)}>Create a school club</button>
                            
                            {createClubOpen === true &&
                                <div className='w-1/3 mt-3 py-2 bg-gray-100 p-2'>
                                    <div className=''>
                                        <input className='border-2 p-2 w-full' type = "text" placeholder='Club Name' onChange = {(e) => setClubName(e.target.value)}></input>
                                    </div>
                                
                                    <div className='mt-2'>
                                        <input className='border-2 p-2 w-full' type = "text" placeholder='Club Description'  onChange = {(e) => setClubDescription(e.target.value)}></input>
                                    </div>
                                
                                    <div className='mt-2'>
                                        <input className='border-2 p-2 w-full' type = "text" placeholder='Club Picture URL'  onChange = {(e) => setIMGurl(e.target.value)}></input>
                                    </div>
                                    
                                    <button className='mt-2  border-2 border-blue-500 p-2 rounded w-full' onClick = {() => createClub()}>Create an Event</button>
                                </div>
                            }

                        </div>

                        <div>
                            <div className='text-center justify-center flex items-center mt-10'>
                                <p className='font-bold text-xl'>Students & users</p>
                                <button className='p-1 px-2 rounded-xl bg-gray-200 hover:bg-gray-400 ml-3' onClick = {() => setStudentHide(!studentHide)}>{studentHide === false ? 'Hide' : 'Show' }</button>
                            </div>
                            <div>
                                {(students !== undefined && studentHide === false) && students.map((friend) => {
                                    return(
                                        <div className='w-full'>
                                                <div className='w-4/5 flex  items-center mt-2 justify-between'>

                                                    {friend.ownimg ? (
                                                    <img className='userPicture rounded-xl '
                                                        src={`/img/${friend.image}`}
                                                    ></img>
                                                    ) : (
                                                    <img src="slide1.png"  className='w-1/4 rounded-xl'></img>
                                                    )}

                                                    <p className='ml-3 w-1/4'>{friend.name}</p>

                                                    <div className='flex ml-3 w-1/4 items-center '>
                                                        <TrophySVG></TrophySVG>
                                                        <p className=''>{friend.points}</p>
                                                    </div>

                                                    <div className='flex w-1/3'>
                                                        <button className='btn bg-blue-500 mr-4 hover:bg-blue-700' onClick={() => {}}>DM</button>
                                                        <button className='btn bg-red-500 hover:bg-red-700'onClick={() => {}}>Block</button>
                                                    </div>

                                                </div>
                                        </div>
                                    )
                                 })}
                            </div>
                        </div>
                        
                    </div>

                    :

                    <div><p>You do not have permission to access this page</p></div>
                    }

                </div>
            }


        </div>
    )
}

export default Admin