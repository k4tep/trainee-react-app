import React from 'react';
import classes from './MyButton.module.css';

export function MyButton(props) {
    return <button {...props} className={classes.button}></button>;
}
