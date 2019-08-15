import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
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
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path={'/'} exact component={BurgerBuilder}/>
                        <Route path={'/auth'} component={Auth}/>
                        <Route path={'/logout'} component={Logout}/>
                        <Route path={'/checkout'} component={Checkout}/>
                        <Route path={'/orders'} component={Orders}/>
                        <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>Page Not Found</h1>}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        autoSignin: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
//withRouter is added since after wrapping App with connect, it does not receive props from react-route
// only needed for components that are not a “route component”, not rendered with: <Route component={}/>
