import React from 'react';
import PrivateRoute from './components/routes/private-route';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PostPage } from './components/pages/PostPage';
import { Error404 } from './components/pages/Error404';
import { PostIdPage } from './components/pages/PostIdPage';
import { LogIn } from './components/pages/LoginPage';
import { SignUp } from './components/pages/SignupPage';
import './styles/App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={'/posts'}></Navigate>}></Route>
                <Route path="/login" element={<LogIn></LogIn>}></Route>
                <Route path="/signup" element={<SignUp></SignUp>}></Route>
                <Route path="/404" element={<Error404></Error404>}></Route>
                <Route
                    path="/posts"
                    element={
                        <PrivateRoute>
                            <PostPage></PostPage>
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/posts/:id"
                    element={
                        <PrivateRoute>
                            <PostIdPage></PostIdPage>
                        </PrivateRoute>
                    }
                ></Route>

                <Route path="*" element={<Navigate to="/404"></Navigate>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

{
    /* <Routes>
                <PrivateRoute element={PostPage} path="/posts"></PrivateRoute>
                <PrivateRoute element={PostIdPage} path="/posts/:id"></PrivateRoute>
                <Route path="/login" element={LogIn}></Route>
                <Route path="/signup" element={SignUp}></Route>
                <Route path="/404" element={Error404}></Route>
                <Route path="/" element={<Navigate to={'/posts'}></Navigate>}></Route>
                <Route path="*" element={<Navigate to="/404"></Navigate>}></Route>
            </Routes> */
}
