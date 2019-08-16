import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layaout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index';

class App extends Component {
    componentDidMount() {
        this.props.autoSignin();
    }

    render() {

        let routes = (
            <>
                <Route path={'/'} exact component={BurgerBuilder}/>
                <Route path={'/auth'} component={Auth}/>
                <Redirect to={'/'}/>
            </>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <>
                    <Route path={'/logout'} component={Logout}/>
                    <Route path={'/checkout'} component={Checkout}/>
                    <Route path={'/orders'} component={Orders}/>
                    <Route path={'/'} exact component={BurgerBuilder}/>
                    <Redirect to={'/'}/>
                </>
            );
        }

        return (
            <div>
                <Layout>
                    <Switch>
                        {routes}
                        {/*<Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>Page Not Found</h1>}/>*/}
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        autoSignin: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//withRouter is added since after wrapping App with connect, it does not receive props from react-route
// only needed for components that are not a “route component”, not rendered with: <Route component={}/>
