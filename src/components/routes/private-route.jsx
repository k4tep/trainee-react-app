import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute({ element, path }) {
    const isLogin = localStorage.getItem('token');

    return isLogin ? (
        <Route path={path} element={element}></Route>
    ) : (
        <Navigate to="/login"></Navigate>
    );
}
