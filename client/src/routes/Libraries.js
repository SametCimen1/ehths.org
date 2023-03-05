import React from 'react'

const Libraries = () => {
  return (
    <div className='container mx-auto text-center'>
        <h1 className='text-center font-bold text-xl'>Libraries used</h1>
        
        <div className='flex justify-between mt-2 bg-gray-100 '>
                <div className='thirtyPercent'>
                    <p className='font-semibold'>Library Name</p>
                </div>

                <div className='thirtyPercent'>
                    <p className='font-semibold'>Purpose</p>
                </div>
                
                <div className='thirtyPercent'>
                    <p className='font-semibold'>Website</p>
                </div>
            </div>

            <div className='flex text-center  justify-between mt-5'>
                <div className='thirtyPercent text-center'>
                    <p className=''>reactjs.org</p>
                </div>

                <div className='thirtyPercent text-center'>
                    <p className=''>Used to write the front-end (user-interface) of the application </p>
                </div>
                
                <div className='thirtyPercent text-center'>
                    <p className=''>https://reactjs.org/</p>
                </div>
            </div>


            <div className='flex text-center  justify-between mt-5 bg-gray-100'>
                <div className='thirtyPercent text-center'>
                    <p className=''>Redux</p>
                </div>

                <div className='thirtyPercent text-center'>
                    <p className=''>Storing the user information and sharing them throughout the components</p>
                </div>
                
                <div className='thirtyPercent text-center'>
                    <p className=''>https://redux.js.org/</p>
                </div>
            </div>


            <div className='flex text-center  justify-between mt-5 bg-gray-100'>
                <div className='thirtyPercent text-center'>
                    <p className=''>Tailwind</p>
                </div>

                <div className='thirtyPercent text-center'>
                    <p className=''>Used to style the front-end with the CSS framework provided </p>
                </div>
                
                <div className='thirtyPercent text-center'>
                    <p className=''>https://tailwindcss.com/</p>
                </div>
            </div>

            <div className='flex text-center  justify-between mt-5'>
                <div className='thirtyPercent text-center'>
                    <p className=''>Daisyui</p>
                </div>

                <div className='thirtyPercent text-center'>
                    <p className=''>Used the components styled by Daisyui and it's stylesheet for the designing</p>
                </div>
                
                <div className='thirtyPercent text-center'>
                    <p className=''>https://daisyui.com/</p>
                </div>
            </div>

            <div className='flex text-center  justify-between mt-5 bg-gray-100'>
                <div className='thirtyPercent text-center'>
                    <p className=''>fs</p>
                </div>

                <div className='thirtyPercent text-center'>
                    <p className=''>Used to read and write into images directory in the server to update images</p>
                </div>
                
                <div className='thirtyPercent text-center'>
                    <p className=''>https://nodejs.org/api/fs.html</p>
                </div>
            </div>

        
        <div>



        <h1 className='text-center font-bold text-xl mt-10'>Copyright</h1>



        <div className='flex justify-between mt-2 bg-gray-100 '>
                <div className='thirtyPercent'>
                    <p className='font-semibold'>Name</p>
                </div>

                <div className='thirtyPercent'>
                    <p className='font-semibold'>Purpose</p>
                </div>
                
                <div className='thirtyPercent'>
                    <p className='font-semibold'>Website</p>
                </div>
        </div>

            <div className='flex text-center  justify-between mt-5'>
                <div className='thirtyPercent text-center'>
                    <p className=''>Unsplash</p>
                </div>

                <div className='thirtyPercent text-center'>
                    <p className=''>Source of all of the images in the program. License: Creative Commons license</p>
                </div>
                
                <div className='thirtyPercent text-center'>
                    <p className=''>https://unsplash.com/license</p>
                </div>
            </div>


            <div className='flex text-center  justify-between mt-5 bg-gray-100'>
                <div className='thirtyPercent text-center'>
                    <p className=''>Font Awesome</p>
                </div>

                <div className='thirtyPercent text-center'>
                    <p className=''>Source of all of the icons in the program.  License: Creative Commons license</p>
                </div>
                
                <div className='thirtyPercent text-center'>
                    <p className=''>https://fontawesome.com/license/free</p>
                </div>
            </div>


            <div className='flex text-center  justify-between mt-5 bg-gray-100'>
                <div className='thirtyPercent text-center'>
                    <p className=''>Undraw</p>
                </div>

                <div className='thirtyPercent text-center'>
                    <p className=''>Illisturations in the program (The blue images in the main screen.) Liscense: Creative Commons license</p>
                </div>
                
                <div className='thirtyPercent text-center'>
                    <p className=''>https://undraw.co/license</p>
                </div>
            </div>


        </div>

    </div>
  )
}

export default Libraries