import React from 'react';

import classes from './Toolbar.module.css';

const toolbar = () => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <div>Logo</div>
    <nav>
      menu-items
    </nav>
  </header>
);

export default toolbar;