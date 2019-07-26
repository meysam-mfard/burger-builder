import React, {Component} from 'react';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
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
        this.props.history.replace('/ckeckout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 cancelClicked={this.cancelClickHandler}
                                 continueClicked={this.continueClickHandler}/>
            </div>
        );
    }
}

export default Checkout;