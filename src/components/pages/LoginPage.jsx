import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EnterProfile } from '../LogSignForm';
import { logIn } from '../../request/login-and-signup';

export function LogIn() {
    const navigate = useNavigate();
    async function log(info) {
        const data = await logIn({ ...info, loginType: 'native' });
        if (data.error) {
            alert(data.error);
        } else {
            localStorage.setItem('token', data.data.token);
            navigate('/posts');
        }
    }

    return <EnterProfile enter={log}></EnterProfile>;
}
