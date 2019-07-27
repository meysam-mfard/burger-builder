import React, {Component} from 'react';
import {Route} from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    constructor(props) {
        super(props);
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredientsObject = {};
        let price = 0;
        for (let param of queryParams) {
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                ingredientsObject[param[0]] = +param[1];
            }
        }
        this.state = {ingredients: ingredientsObject, totalPrice: price};
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
                    render={(props) => (//props is passed to have access to axios history object in ContactData
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props}/>
                    )}/>
            </div>
        );
    }
}

export default Checkout;