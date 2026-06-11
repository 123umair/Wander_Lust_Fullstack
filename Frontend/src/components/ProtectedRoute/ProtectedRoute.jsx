import React from 'react'
import { useLocation, Navigate } from 'react-router'
const ProtectedRoute = ({ user, children }) => {
    const location = useLocation()

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children

}

export default ProtectedRoute