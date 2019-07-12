import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../Backdrop/Backdrop';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;