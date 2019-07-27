import React, {Component} from 'react';
import {Route} from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    };

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredientsObject = {};
        for (let param of queryParams) {
            ingredientsObject[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredientsObject});
    }

    cancelClickHandler = () => {
        this.props.history.goBack();
    };

    continueClickHandler = () => {
        this.props.history.replace(this.props.match.path + '/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 cancelClicked={this.cancelClickHandler}
                                 continueClicked={this.continueClickHandler}/>
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;