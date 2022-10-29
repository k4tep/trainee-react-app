import React from 'react';
import classes from './PopUp.module.css';

export function PopUp({ children, visible, setVisible }) {
    const classContainer = [classes._container];
    if (!visible) {
        classContainer.push(classes.closed);
    }

    return (
        <div className={classContainer.join(', ')} onClick={() => setVisible(false)}>
            {children}
        </div>
    );
}
