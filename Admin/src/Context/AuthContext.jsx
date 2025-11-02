import React, { createContext } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext()

const AuthContext = ({children}) => {
    let serverUrl = 'http://localhost:8000'

    let value ={
        serverUrl
    }

  return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>

  )
}

export default AuthContext