import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './containers/Layout/Layaout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path={'/'} exact component={BurgerBuilder}/>
                        <Route path={'/checkout'} component={Checkout}/>
                        <Route path={'/orders'} component={Orders}/>
                        <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>Page Not Found</h1>}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
