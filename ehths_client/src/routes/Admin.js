import React, {useState, useEffect} from 'react'

const Admin = () => {
    const [user, setUser] = useState(undefined)

    const getUser = async() => {
        const data = await fetch("http://localhost:5000/user/getUser", {
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