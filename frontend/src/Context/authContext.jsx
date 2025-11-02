import React, { createContext } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const  authDataContext = createContext()


const AuthContext = ({children}) => {
    let serverUrl = 'http://localhost:8000';

    let value ={
        serverUrl
    }

    return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext