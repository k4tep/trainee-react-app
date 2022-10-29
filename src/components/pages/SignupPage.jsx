import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EnterProfile } from '../LogSignForm';
import { signUp } from '../../request/login-and-signup';

export function SignUp() {
    const navigate = useNavigate();
    async function sign(info) {
        const data = await signUp({ ...info, signUpType: 'native' });
        if (data.error) {
            alert(data.error);
        } else {
            localStorage.setItem('token', data.data.token);
            navigate('/posts');
        }
    }

    return <EnterProfile enter={sign}></EnterProfile>;
}
