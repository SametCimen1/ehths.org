import React, {useState, useEffect} from 'react'
import TrophySVG from '../svgs/TrophySVG';

const Layout = ({children}) => {

    const [theme, setTheme] = useState("light");
    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setUser] = useState(undefined)
    const [loggedIn, setIsLoggedIn] = useState();


    const getRealUserData = async() => {
      const data = await fetch("/user/getUser", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include',
      });
      const response = await data.json();
      console.log("RESSPONSE COMING", response)
      setUser(response);
      if(response === undefined){
        setIsLoggedIn(false)
      }else{setIsLoggedIn(response.email.length > 0);}

    }




    const getAuth = async() => {

        const data = await fetch("/userexist", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
        })
        const response = await data.json();
        if(response === true){
            getRealUserData()
        }

    
    }


    useEffect(() => { 
        const currentTheme = localStorage.getItem('theme');
        if(currentTheme !== null){
          setTheme(currentTheme)
        }
        else{
          localStorage.setItem('theme', "light")
          setTheme("light")
        }
        getRealUserData();
      }, [])
  

      useEffect(() => {
        console.log("CAHNGE IN USER", user)
      },[user])
        
  const  changeTheme = (theme) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }


    const logOut = async() => {
      const data = await fetch("/logout", {
          method:"POST",
          headers: {  
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
      })
      window.location.reload(true)

    }

    return (
    <div data-theme = {theme} className="main">

      <div className = " bg-black px-2  sm:px-0 lg:w-full ">
        <div className=''>
          <div className='py-3 flex items-center mx-auto  justify-between container'>
              <div>
                <a href ="/" className = ""><h1 className = "text-4xl text-white" >ehths.<span className="text-blue-500">org</span></h1></a>
              </div>


            <div className="dropdown dropdown-end  inline-flex md:hidden text-white">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
                <li><a href = "/">Homepage</a></li>
                <li><a href = "/signin">Sign in</a></li>
                <li><a href = "/dashboard">Sign Up</a></li>
              </ul>
            </div>


            {user !== undefined && 
             <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <nav className = "list-none flex items-center md:flex-row md:space-x-3 md:mt-0  ">
                
                <div className = "dropdown">
                  <li  href = "/" tabIndex="0" className=" text-white nav-link hover:cursor-pointer ">Themes</li>
                  <ul tabIndex="0" className="dropdown-content menu  shadow bg-base-100 rounded-box  w-40">
                    <li onClick = {e => changeTheme("light")}><a>Light</a></li>
                    <li onClick = {e => changeTheme("black")}><a>Dark</a></li>
                    <li onClick = {e => changeTheme("valentine")}><a>Pink</a></li>
                    <li onClick = {e => changeTheme("night")}><a>Night</a></li>
                    <li onClick = {e => changeTheme("synthwave")}><a>Synthwave</a></li>
                  </ul>
                </div>
                
                {isLoaded === false 
                ?
                <div>
                  <div class="flex justify-center items-center">
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  </div>
                </div>
                : 
                <div className='flex items-center justify-between'>

                  {!loggedIn && 
                    <div>
                      <a className = "text-white nav-link mx-3" href = "/clubs">Events</a>
                    </div>
                  }

                    {!loggedIn && 
                    <div>
                      <a className = "text-white nav-link mx-3" href = "/clubs">Clubs</a>
                    </div>
                  }


                  {!loggedIn &&
                    <div> 
                      <a href = "/signin"><button type = "button" className = "btn btn-primary" style = {{"marginRight":"1rem"}}>Sign in</button></a>
                      <a href = "/signup"><button type = "button" className = "btn hover:bg-white hover:text-black btn-ghost border-2 border-white text-white ">Sign up</button></a>                
                    </div>
                  } 
                  </div>}

                  {loggedIn && 
                    <div className='flex items-center justify-center'> 
                      <TrophySVG></TrophySVG>
                      <a className = "text-white nav-link " href >{user.points}</a>
                    </div> 
                    
                  }
                  

 
                  

                  {loggedIn &&
                    <div className="dropdown  dropdown-end">
                      <img tabIndex="0" className = "w-14 h-14  rounded-xl cursor-pointer  object-cover ml-2" src = {`${user.image.includes("http") ? user.image : "/img/" + user.image} `}  /> 
                      <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='mt-1 focus:bg-slate-300'><a className = "focus:bg-slate-300'"  href = "/dashboard">Panel</a></li>
                        <li className='mt-1'><a href = {`/profile`}>Profile</a></li>
                      </ul>
                    </div>
                  }  


                
              
            


                </nav>
                
                  
                </div>
          } 

        </div>
      
        
</div>

</div>


      <main>
        
        {children }
      
      </main>



      
    </div>
  )
}

export default Layout