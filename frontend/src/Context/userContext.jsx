import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext'

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext()

const UserContext = ({children}) => {

let [userData,setUserData] = useState('')

let {serverUrl} = useContext(authDataContext)

    const getCurrentUser = async ()=>{
        try {
            let result = await axios.get(serverUrl+'/api/user/getCurrentUser',{withCredentials:true})

            setUserData(result.data)
            console.log(result.data);
            

        } catch (error) {
            setUserData(null)
            console.log(error);
        }
    }

    useEffect(()=>{
        getCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    let value={
        userData,setUserData,getCurrentUser
    }

  return (
    <div>
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext