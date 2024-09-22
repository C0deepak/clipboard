'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { data: session } = useSession()

    useEffect(() => {
        if (session?.user) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [session])

    const loggedIn = () => {
        setIsAuthenticated(true)
    }

    const loggedOut = () => {
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loggedIn, loggedOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext
