const Footer = () => {
    return (
      <div className='w-full bg-black'>
          <div className = "container flex justify-between py-3 mx-auto">
              <div className='w-1/3 md:block hidden'>
                  <h1 className='text-4xl font-bold text-white'>Ehths<span className = "text-blue-500">.org</span></h1>
                  <p className='text-gray-400 mt-1'>At ehths.org we aim to increase the student participation and student's involvement in the school. Join us today to join events, create events, and find friends.</p>
              </div>
  
              <div className='flex flex-col md:flex-row md:w-1/2  md:justify-between mx-auto text-center md:text-left'>

                  <div className='md:w-33 mt-3 md:mt-0'>
                      <h5 className='text-white text-2xl font-bold'>Copyright & Libraries</h5>
                      <ul className='text-muted navbar-nav'>
                          <li className=''><a className='text-gray-400' href = "/termsofuse">Copyright</a></li>
                          <li><a className='text-gray-400' href = "/privacy">Libraries used</a></li>
                      </ul>
                  </div>
  
  
                  <div className='md:w-33 mt-3 md:mt-0'>
                      <h5 className='text-white display-20 text-2xl font-bold'>Contact us</h5>
                      <ul className='text-muted navbar-nav'>
                          <li className=''><a className=' text-gray-400 text-decoration-none' href = "/">Send us an E-Mail</a></li>
                          <div className='flex justify-center'>
                              <img src = "images/twitter.svg"></img>
                              <img src = "images/instagram.svg"></img>
                              <img src = "images/telegram.svg"></img>
                          </div>
                      </ul>
                  </div>
  
              </div>
              
  
          </div>
      </div>
    )
  }
  
  
  export default Footer