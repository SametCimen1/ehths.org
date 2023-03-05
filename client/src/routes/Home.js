import React, {useState, useEffect} from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


import SignupSVG from '../svgs/SignupSVG';
import Footer from '../components/Footer'
import { useNavigate, Link  } from "react-router-dom";

const Home = () => {
    let navigate  = useNavigate();

    const images = [
        "https://townsquare.media/site/396/files/2017/10/High-School.jpg?w=980&q=75",
        "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/239247354_904447256837899_6646704184363486046_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=prYaIHvfhr0AX9nXirJ&_nc_ht=scontent-lga3-1.xx&oh=00_AfASfdscP2N3f5tKVOrPUUgxNBV7vq9kGXxgOCwLvS6mJQ&oe=64082870",
        "https://cdnsm5-ss13.sharpschool.com/UserFiles/Servers/Server_252384/Image/1%20HS%20BANNER.png",
    ];
    const [events, setEvents] = useState([])

    
   
    useEffect(()=>{
     getUser();
     getEvents();
    },[])
    
    const getUser = async () => {
        const data = await fetch("/userexist", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const response = await data.json();
        if(response === true){
            
        }
    }

    const getEvents = async() => {
        const data = await fetch("/getCurrentEvents", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const res = await data.json();
        console.log("RESSSDSADA", res)
        setEvents(res)
    }


    return (
        
    <div>
        <div className='text-center mt-3'>
            <h1 className='font-bold text-4xl'>Egg Harbor Township High School</h1>
            <p className='text-muted text-gray-600 text-base font-small'>Where inspiration meets with possibilities</p>
        </div>

        <div className='container mx-auto mt-2'>
            <Slide>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    </div>
                </div>
            </Slide>
        </div>


        <div className='container mt-10 mx-auto'>
            <h1 className='font-bold text-3xl'>Join us and enjoy increase your knowledge and grades</h1>
            <p className='text-muted text-gray-600 text-base font-small'>Read our articles, student of the week, club events, sport news and much more on our website.</p>
        

            {/*card section */}
            <div className='flex justify-between'>
                <div class="max-w-sm rounded overflow-hidden shadow-lg mt-2">
                    <img class="w-full" src="eventPIC.jpg" alt="Sunset in the mountains" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Join Events</div>
                        <p class="text-gray-700 text-base">
                            Find events that you like and sign up with one-click! Earn points by joining events and have the chance to win prizes
                        </p>
                    </div>
                </div>

                <div class="max-w-sm rounded overflow-hidden shadow-lg mt-2">
                    <img class="w-full" src="groupsPIC.jpg" alt="Sunset in the mountains" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Create Groups</div>
                        <p class="text-gray-700 text-base">
                            Do you have a passion and interested in finding people who share your passion? Create a group today and find people to work together and be friends
                        </p>
                    </div>
                </div>

                <div class="max-w-sm rounded overflow-hidden shadow-lg mt-2">
                    <img class="w-full" src="chat.jpg" alt="Sunset in the mountains" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Chat with your classmates</div>
                        <p class="text-gray-700 text-base">
                            You do not have to go to another application to chat with your friends, just click on the DM section and start texting your friends
                        </p>
                    </div>
                </div>

            </div>



        </div>



        <div className='container mt-10 mx-auto'>
            <h1 className='font-bold text-3xl'>Build up your resume with these clubs and activities, it will look great in the future </h1>
            <p className='text-muted text-gray-600 text-base font-small'>Read our articles, student of the week, club events, sport news and much more on our website.</p>
        
            <div className="mockup-window border bg-base-300 p-3">
                <img src = "windowMock.png" className='w-full'/>
            </div>
        </div>



        <div className='container mt-10 mx-auto'>
            <h1 className='font-bold text-3xl'>Upcoming events that you can sign up right now</h1>
            <p className='text-muted text-gray-600 text-base font-small'>Create your account now and sign up for any event that you want to attend</p>
        

            {/*card section */}
            <div className='flex justify-between align-stretch wrap'>

                    {events.map((element) => {
                        return (
                            <div className='cardMin w-1/2 mt-4 justify-center  mx-auto'>
                            <Link>
                                    <div className="card w-10/12 bg-base-100 shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title">{element.header}</h2>
                                            <p>{element.description}</p>
                                            <p>{element.club}</p>
                                            <div className="flex justify-between items-center">
                                            </div>
                                        </div>
                                    </div>
                            </Link>
                          </div>
                        )
                    })}


            </div>



        </div>



        <div className='container mt-10 mb-10 mx-auto'>
            <h1 className='font-bold text-3xl'>Sign up now!</h1>
            <div className='flex  justify-around items-center'>
                <SignupSVG></SignupSVG>
                <div className='text-center'>
                    <p className='text-muted text-gray-600 text-base font-small '>Read our articles, student of the week, club events, sport news and much more on our website.</p>
                    <Link to ="/signup"><button className='btn bg-blue-500 w-1/2 mx-auto hover:bg-blue-700'>Sign Up</button></Link>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
  )
}

export default Home