import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {

    const cancelClickHandler = () => {
        props.history.goBack();
    };

    const continueClickHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

        let summary = <Redirect to="/"/>;
        const purchasedRedirect = props.purchasing ? null : <Redirect to='/'/>;
        if (props.ingredients) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={props.ingredients}
                                     cancelClicked={cancelClickHandler}
                                     continueClicked={continueClickHandler}/>
                    <Route
                        path={'/checkout/contact-data'}
                        component={ContactData}/>
                </div>
            );
        }

        return summary;

};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchasing: state.order.purchasing
    }
};

export default connect(mapStateToProps)(Checkout);