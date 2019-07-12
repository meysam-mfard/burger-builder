import React from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../UI/Sidedrawer/Sidedrawer';

const layout = props => (
  <>
    <Sidedrawer/>
    <Toolbar/>
    <main className={classes.content}>
      {props.children}
    </main>
  </>
);

export default layout;
