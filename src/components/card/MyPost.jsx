import React from 'react';
import classes from './MyPost.module.css';
import { MyButton } from '../button/MyButton';
import { deleteCharacter } from '../../request/delete-character';
import { useNavigate } from 'react-router-dom';

export function MyPost(props) {
    const navigate = useNavigate();

    function moreInfo(id) {
        navigate(`/posts/${id}`);
    }

    return (
        <div {...props} className={classes.div}>
            <div className={classes.container}>
                <img className={classes.img} src={props.img}></img>
                <h2>
                    {props.name}: {props.race}
                </h2>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
                <MyButton
                    onClick={(e) => {
                        e.stopPropagation();
                        moreInfo(props.id);
                    }}
                >
                    Open detailed info
                </MyButton>
                <MyButton
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteCharacter(props.id);
                    }}
                >
                    Delete
                </MyButton>
            </div>
        </div>
    );
}
