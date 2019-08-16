import React from 'react';

import classes from './Sidedrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidedrawer = (props) => {

  let sidedrawerClasses = [classes.Sidedrawer, classes.Close];
  if (props.open) {
    sidedrawerClasses = [classes.Sidedrawer, classes.Open];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.close}/>
      <div className={sidedrawerClasses.join(' ')} onClick={props.close}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </>
  );
};

export default sidedrawer;