import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyButton } from '../components/button/MyButton';
import { MyInput } from '../components/input/MyInput';

export function EnterProfile(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const info = {
        email: '',
        password: ''
    };

    let type = '';

    if (location.pathname === '/login') {
        type = 'LogIn';
    } else {
        type = 'SignUp';
    }

    return (
        <div className="container characterInfo">
            <div className="App login bar">
                <p className="text">{type}</p>
                <MyInput
                    placeholder="Email"
                    onBlur={(e) =>
                        e.target.value != '' ? (info.email = e.target.value) : alert('Enter email')
                    }
                ></MyInput>
                <MyInput
                    type="password"
                    placeholder="Password"
                    onBlur={(e) =>
                        e.target.value != ''
                            ? (info.password = e.target.value)
                            : alert('Enter password')
                    }
                ></MyInput>
                <MyButton
                    onClick={(e) => {
                        props.enter(info);
                        e.stopPropagation();
                    }}
                >
                    {type}
                </MyButton>
                <p
                    className="text point"
                    onClick={(e) => {
                        location.pathname === '/login' ? navigate('/signup') : navigate('/login');
                        e.stopPropagation();
                    }}
                >
                    {location.pathname === '/login' ? "I don't have profile" : 'I have a profile'}
                </p>
            </div>
        </div>
    );
}
