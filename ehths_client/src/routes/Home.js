import React, {useState, useEffect} from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


import SignupSVG from '../svgs/SignupSVG';
import Footer from '../components/Footer'
import { useNavigate  } from "react-router-dom";

const Home = () => {
    let navigate  = useNavigate();

    const images = [
        "slide1.png",
        "slide2.jpg",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];

    
   
    useEffect(()=>{
     getUser();
    },[])
    
    const getUser = async () => {
        const data = await fetch("http://localhost:5000/userexist", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
        })
        const response = await data.json();
        if(response === true){
            navigate('/dashboard')
        }

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
                    <img class="w-full" src="slide1.png" alt="Sunset in the mountains" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                </div>

                <div class="max-w-sm rounded overflow-hidden shadow-lg mt-2">
                    <img class="w-full" src="slide1.png" alt="Sunset in the mountains" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                </div>

                <div class="max-w-sm rounded overflow-hidden shadow-lg mt-2">
                    <img class="w-full" src="slide1.png" alt="Sunset in the mountains" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
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
            <h1 className='font-bold text-3xl'>Join us and enjoy increase your knowledge and grades</h1>
            <p className='text-muted text-gray-600 text-base font-small'>Read our articles, student of the week, club events, sport news and much more on our website.</p>
        

            {/*card section */}
            <div className='flex justify-between'>
                <div className = "w-full mt-2 card md:w-1/5">
                    <div className="rounded-lg hover:border-blue-500 py-2"> 
                        <div className='fill-neutral mx-auto  mt-1'><img src = "slide1.png"></img></div>
                        <div className="mt-2 p-3">
                        <h5 className="text-center font-bold  text-2xl ">dsadsadas</h5>
                        <p className="text-center mt-2">dasdsa</p>
                        </div>
                    </div>
                </div>

                <div className = "w-full mt-2 card md:w-1/5">
                    <div className="rounded-lg hover:border-blue-500 py-2"> 
                        <div className='fill-neutral mx-auto  mt-1'><img src = "slide1.png"></img></div>
                        <div className="mt-2 p-3">
                        <h5 className="text-center font-bold  text-2xl ">dsadsadas</h5>
                        <p className="text-center mt-2">dasdsa</p>
                        </div>
                    </div>
                </div>

                <div className = "w-full mt-2 card md:w-1/5">
                    <div className="rounded-lg hover:border-blue-500 py-2"> 
                        <div className='fill-neutral mx-auto  mt-1'><img src = "slide1.png"></img></div>
                        <div className="mt-2 p-3">
                        <h5 className="text-center font-bold  text-2xl ">dsadsadas</h5>
                        <p className="text-center mt-2">dasdsa</p>
                        </div>
                    </div>
                </div>

            </div>



        </div>



        <div className='container mt-10 mx-auto'>
            <h1 className='font-bold text-3xl'>Sign up now!</h1>
            <div className='flex  justify-around items-center'>
                <SignupSVG></SignupSVG>
                <div>
                    <p className='text-muted text-gray-600 text-base font-small'>Read our articles, student of the week, club events, sport news and much more on our website.</p>
                    <button className='btn bg-blue-500 w-1/2 mx-auto'>Sign Un</button>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
  )
}

export default Home