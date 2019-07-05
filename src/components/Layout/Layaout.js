import React from 'react';

import classes from './Layout.module.css';

const layout = props => (
    <>
        <div>Toolbar, Sidedrawer, Bachdrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </>
);

export default layout;
