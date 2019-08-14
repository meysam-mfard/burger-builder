import React, {Component} from 'react';
import {connect} from "react-redux";

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSidedrawer: false
    };

    sidedrawerCloseHandler = () => {
        this.setState({showSidedrawer: false});
    };

    sidedrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSidedrawer: !prevState.showSidedrawer}
        });
    };

    render() {
        return (
            <>
                <Sidedrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSidedrawer}
                    close={this.sidedrawerCloseHandler}/>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sidedrawerToggleHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);
