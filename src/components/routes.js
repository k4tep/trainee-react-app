import React from 'react';
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
