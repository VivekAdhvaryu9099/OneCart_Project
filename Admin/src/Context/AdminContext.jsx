import React, { createContext, useContext, useEffect, useState } from 'react'
import { DataContext } from './AuthContext'
import axios from 'axios'

// eslint-disable-next-line react-refresh/only-export-components
export const adminDataContext = createContext()

const AdminContext = ( {children}) => {

    let [adminData,setAdminData] = useState(null)
    let {serverUrl} = useContext(DataContext)

    const getAdmin = async()=>{
      try {
          let result = await axios.get(serverUrl+'/api/user/getadmin',{withCredentials:true})

        setAdminData(result.data)
        console.log(result.data);
        
      } catch (error) {
       setAdminData(null)
        console.log(error);
      }
    }

    useEffect(()=>{
        getAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    let value={
        adminData,setAdminData,getAdmin
    }

  return (
        <adminDataContext.Provider value={value}>
                {children}
        </adminDataContext.Provider>
  )
}

export default AdminContext