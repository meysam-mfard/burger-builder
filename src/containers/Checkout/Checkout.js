import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    cancelClickHandler = () => {
        this.props.history.goBack();
    };

    continueClickHandler = () => {
        this.props.history.replace(this.props.match.path + '/contact-data');
    };

    render() {
        let summary = <Redirect to="/"/>;
        const purchasedRedirect = this.props.purchasing ? null : <Redirect to='/'/>;
        if (this.props.ingredients) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients}
                                     cancelClicked={this.cancelClickHandler}
                                     continueClicked={this.continueClickHandler}/>
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}/>
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchasing: state.order.purchasing
    }
};

export default connect(mapStateToProps)(Checkout);