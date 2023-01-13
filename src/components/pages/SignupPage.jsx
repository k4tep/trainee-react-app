import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnterProfile } from '../LogSignForm';
import { reduxSignUp } from '../../store/profile-slice';
import { useDispatch, useSelector } from 'react-redux';

export function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.profile.token);
    const error = useSelector((state) => state.profile.error);

    function sign(info) {
        dispatch(reduxSignUp({ ...info, signUpType: 'native' }));
    }

    useEffect(() => {
        if (token) {
            navigate('/posts');
        } else if (error) {
            alert(error);
        }
    }, [error, token]);

    return <EnterProfile enter={sign}></EnterProfile>;
}
