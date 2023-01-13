import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { isAuth } = useAuth();
    // debugger;
    if (!isAuth) {
        return <Navigate to="/login"></Navigate>;
    }
    return children;
}
