import React, {useState} from 'react';
import {connect} from "react-redux";

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sidedrawerCloseHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sidedrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    return (
        <>
            <Sidedrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisible}
                close={sidedrawerCloseHandler}/>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sidedrawerToggleHandler}/>
            <main className={classes.content}>
                {props.children}
            </main>
        </>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);
