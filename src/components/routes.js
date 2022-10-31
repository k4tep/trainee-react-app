import React from 'react';
import { PostPage } from './pages/PostPage';
import { Error404 } from './pages/Error404';
import { PostIdPage } from './pages/PostIdPage';
import { LogIn } from './pages/LoginPage';
import { SignUp } from './pages/SignupPage';

const privateRoutes = [
    {
        path: '/posts',
        element: <PostPage></PostPage>,
        exact: true
    },
    {
        path: '/posts/:id',
        element: <PostIdPage></PostIdPage>,
        exact: true
    }
];

const publicRoutes = [
    {
        path: '/404',
        element: <Error404></Error404>,
        exact: true
    },
    {
        path: '/login',
        element: <LogIn></LogIn>,
        exact: true
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>,
        exact: true
    }
];

export { publicRoutes, privateRoutes };
