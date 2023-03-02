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
    const [events, setEvents] = useState([])
    const [eventsHide, setEventsHide] = useState(false)
    const [createIsStudent, setIsCreateStudent] = useState(false)
    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');
    const [IMGurl, setIMGurl] = useState('');
    const [winnerHide, setWinnerHide] = useState(false);


    const [studentEmail, setStudentEmail] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [studentRole, setStudentRole] = useState('');
    const [studentImage, setStudentImage] = useState('');

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
          
        
          const data2 = await fetch("/getAllClubs", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include'
          })
          const res2 = await data2.json();
          setClubs(res2);

                  
          const data3 = await fetch("/getEverything", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include'
          })
          
          const res3 = await data3.json();
          console.log('res3', res3);
          res3.sort(function(a, b) {
            return b.points - a.points;
          });
          console.log('res3again', res3);

          setStudents(res3);

          const data4 = await fetch("/getAllEvents", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include'
          })
          
          const res4 = await data4.json();
          setEvents(res4);



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
            window.location.reload(true);
        }
    }


    useEffect(() => {
        getUser()
    },[])



    const createStudent = async() => {
        const data = await fetch("/createStudent", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body: JSON.stringify({
                studentName, 
                studentEmail,
                studentPassword,
                studentRole,
                studentImage
            })
        });

        const res = await data.json();
        if(res === 'error'){
            alert("error occured, please try again later")
        }
        else{
            alert("successfuly created the user, refreshing the page")
            window.location.reload(true)
        }
    }

    const get9 = async() => {
        const data = await fetch("/getnine", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const winner = await data.json();
        console.log(winner)
    }

    const get10 = async() => {
        const data = await fetch("/getten", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const winner = await data.json();
        console.log(winner)
    }

    const get11 = async() => {
        const data = await fetch("/geteleven", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const winner = await data.json();
        console.log(winner)
    }
    const get12 = async() => {
        const data = await fetch("/gettwelve", {
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const winner = await data.json();
        console.log(winner)
    }
    
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
                                            <Link to = {`/club/${elem.id}`}>
                                                <div className="card w-96 bg-base-100 shadow-xl">
                                                <figure><img className='clubPicture' src = {elem.picture} alt="Club Picture" /></figure>
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
                                    
                                    <button className='mt-2  border-2 border-blue-500 p-2 rounded w-full' onClick = {() => createClub()}>Create the club</button>
                                </div>
                            }

                        </div>

                        <div>
                            <div className='text-center justify-center flex items-center mt-10'>
                                <p className='font-bold text-xl'>Students & users (sorted by highest points)</p>
                                <button className='p-1 px-2 rounded-xl bg-gray-200 hover:bg-gray-400 ml-3' onClick = {() => setStudentHide(!studentHide)}>{studentHide === false ? 'Hide' : 'Show' }</button>
                                <button className='p-1 px-2 rounded-xl bg-gray-200 hover:bg-gray-400 ml-3' onClick = {() => setIsCreateStudent(!createIsStudent)}>{createIsStudent === false ? 'Create' : 'Cancel' }</button>
                            </div>

                            {createIsStudent &&
                                <div className='mx-auto'>
                                        <div className=' mx-auto w-1/3 mt-3 py-2 bg-gray-100 p-2'>
                                            <div className=''>
                                                <input className='border-2 p-2 w-full' type = "text" placeholder='User or Student Name' onChange = {(e) => setStudentName(e.target.value)}></input>
                                            </div>
                                            <div className='mt-2'>
                                                <input className='border-2 p-2 w-full' type = "text" placeholder='Email'  onChange = {(e) => setStudentEmail(e.target.value)}></input>
                                            </div>
                                            <div className='mt-2'>
                                                <input className='border-2 p-2 w-full' type = "password" placeholder='Password'  onChange = {(e) => setStudentPassword(e.target.value)}></input>
                                            </div>
                                            <div className='mt-2'>
                                                <input className='border-2 p-2 w-full' type = "text" placeholder='Role (admin or student)'  onChange = {(e) => setStudentRole(e.target.value)}></input>
                                            </div>
                                            <div className='mt-2'>
                                                <input className='border-2 p-2 w-full' type = "text" placeholder='Image URL'  onChange = {(e) => setStudentImage(e.target.value)}></input>
                                            </div>
                                            
                                            <button className='mt-2  border-2 border-blue-500 p-2 rounded w-full' onClick = {() => createStudent()}>Create an Event</button>
                                        </div>
                                </div>
                            }
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
                                                        <img src= {friend.image}  className='userPicture rounded-xl'></img>
                                                    )}

                                                    <p className='ml-3 w-1/4'>{friend.name}</p>

                                                    <p className='ml-3 w-1/4'>{friend.grade} grade</p>

                                                    <div className='flex ml-3 w-1/4 items-center '>
                                                        <TrophySVG></TrophySVG>
                                                        <p className=''>{friend.points}</p>
                                                    </div>

                                                    <div className='flex w-1/3'>
                                                        <button className='btn bg-blue-500 mr-4 hover:bg-blue-700' onClick={() => {}}>Edit Information</button>
                                                        <button className='btn bg-red-500 hover:bg-red-700'onClick={() => {}}>Remove</button>
                                                    </div>

                                                </div>
                                        </div>
                                    )
                                 })}
                            </div>
                        </div>


                        
                        <div>
                            <div className='text-center justify-center flex items-center mt-10'>
                                <p className='font-bold text-xl'>Events</p>
                                <button className='p-1 px-2 rounded-xl bg-gray-200 hover:bg-gray-400 ml-3' onClick = {() => setEventsHide(!eventsHide)}>{eventsHide === false ? 'Hide' : 'Show' }</button>
                            </div>
                            <div>
                                {(events !== undefined && eventsHide === false) && events.map((elem) => {
                                    return(
                                        <div className='w-1/4 mt-4 mx-2'>
                                        <Link to = {`/club/${elem.id}`}>
                                          <div className="card w-96 bg-base-100 shadow-xl">
                                          <figure><img src = {elem.picture} alt="Club Picture" /></figure>
                                          <div className="card-body">
                                              <h2 className="card-title">{elem.name}</h2>
                                              <p className='text-left'>{elem.description}</p>
                                              {/* <div className="flex justify-between items-center">
                                                  <button className="btn btn-primary">Visit</button>
                                                  <p className='ml-3'>40 Members</p>
                                              </div> */}
                                          </div>
                                          </div>
                                        </Link>
                                      </div>
                                    )
                                })}
                                            
                            </div>
                        </div>



                        
                        <div>
                            <div className='text-center justify-center flex items-center mt-10'>
                                <p className='font-bold text-xl'>Pick a random winner</p>
                                <button className='p-1 px-2 rounded-xl bg-gray-200 hover:bg-gray-400 ml-3' onClick = {() => setWinnerHide(!winnerHide)}>{winnerHide === false ? 'Hide' : 'Show' }</button>
                            </div>

                            <div className='flex justify-start w-full'>

                                <button className='btn bg-gray-200 hover:bg-gray-400' onClick={() => get9()}>Pick a random winner from 9th grade</button>
                                <button className='ml-2 btn bg-gray-200 hover:bg-gray-400' onClick={() => get10()}>Pick a random winner from 10th grade</button>
                                <button className='ml-2 btn bg-gray-200 hover:bg-gray-400' onClick={() => get11()}>Pick a random winner from 11th grade</button>
                                <button className='ml-2 btn bg-gray-200 hover:bg-gray-400' onClick={() => get12()}>Pick a random winner from 12th grade</button>
                            
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