import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnterProfile } from '../LogSignForm';
import { reduxLogIn } from '../../store/profile-slice';
import { useDispatch, useSelector } from 'react-redux';

export function LogIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.profile.token);
    const error = useSelector((state) => state.profile.error);

    function log(info) {
        dispatch(reduxLogIn({ ...info, loginType: 'native' }));
    }

    useEffect(() => {
        if (token) {
            navigate('/posts');
        } else if (error) {
            alert(error);
        }
    }, [error, token]);

    return <EnterProfile enter={log}></EnterProfile>;
}
