import React from 'react';

import classes from './Sidedrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const sidedrawer = (props) => {
  return (
    <div className={classes.Sidedrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sidedrawer;