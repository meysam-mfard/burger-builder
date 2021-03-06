import React, {useEffect, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layaout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Auth = React.lazy(() => import ('./containers/Auth/Auth'));
const Orders = React.lazy(() => import ('./containers/Orders/Orders'));

const App = props => {

    const {autoSignin} = props;

    useEffect(() => {
        autoSignin();
    }, [autoSignin]);

    let routes = (
        <Switch>
            <Route path='/auth' render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                    <Auth/>
                </Suspense>)}
            />
            <Route path='/' exact component={BurgerBuilder}/>
            <Redirect to='/'/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path='/auth' render={props => <Auth {...props}/>} />
                <Route path='/checkout' render={props => <Checkout {...props}/>} />
                <Route path='/orders' render={props => <Orders {...props}/>} />
                <Route path='/logout' component={Logout}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
};

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
