import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
        }
    }, [location, setIsAuthenticated])

    return (
        null
    )
}

export default RefrshHandler
