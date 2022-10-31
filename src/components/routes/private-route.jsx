import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const isLogin = localStorage.getItem('token');

    // debugger;
    if (!isLogin) {
        return <Navigate to="/login"></Navigate>;
    }
    return children;
}
