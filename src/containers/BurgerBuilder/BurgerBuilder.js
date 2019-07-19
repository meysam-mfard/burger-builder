import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.6,
    cheese: 0.4,
    meat: 1.2
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    moreIngredientHandler = type => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchasable(updatedIngredients);
    };

    lessIngredientHandler = type => {
        const updatedIngredients = {...this.state.ingredients};
        if (updatedIngredients[type] <= 0)
            return;
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchasable(updatedIngredients);
    };

    updatePurchasable = (ingredients) => {//ingredients is passed as arg to be able to get the latest state
        const totalIngrtCount = Object.values(ingredients)
            .reduce((count, currIngrCount) =>
                count + currIngrCount, 0);
        this.setState({purchasable: totalIngrtCount});
    };

    purchasingHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            deliveryMethod: 'fastest',
            customer: {
                name: 'customer1',
                address: {
                    street: 'dummy street',
                    zipCode: '123456',
                    city: 'Stockholm'
                },
                email: 'customer1@email.com'
            }
        };

        axios.post('orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    };

    render() {
        const buttonDisabledInfo = {
            ...this.state.ingredients
        };
        for (let key in buttonDisabledInfo) {
            buttonDisabledInfo[key] = buttonDisabledInfo[key] <= 0;
        }

        let orderSummary =
            <OrderSummary purchaseCancelled={this.purchaseCancelHandler}
                          purchaseContinued={this.purchaseContinueHandler}
                          ingredients={this.state.ingredients}
                          price={this.state.totalPrice.toFixed(2)}/>;
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    moreIngredient={this.moreIngredientHandler}
                    lessIngredient={this.lessIngredientHandler}
                    price={this.state.totalPrice}
                    disabled={buttonDisabledInfo}
                    purchasable={this.state.purchasable}
                    order={this.purchasingHandler}/>
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
