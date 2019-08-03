import React, {Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler';
import * as actionType from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        //this is used to enforce a specific order for ingredients in UI
        /*const ingredientsObject = {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        };

        let tempIngredients = null;
        axios.request('https://burger-builder-react-9f1de.firebaseio.com/ingredients.json')
            .then(response =>
                //this.setState({ingredients: response.data}))
                tempIngredients = response.data)
            .catch(error =>
                this.setState({error: true}));

        //this is used to enforce a specific order for ingredients in UI
        for (let ingrt in ingredientsObject.keys) {
            ingredientsObject[ingrt] = tempIngredients[ingrt];
        }
        this.setState({ingredients: ingredientsObject});*/
    }

    updatePurchasable = () => {
        const totalIngrtCount = Object.values(this.props.ingredients)
            .reduce((count, currIngrCount) =>
                count + currIngrCount, 0);
        return totalIngrtCount > 0;
    };

    purchasingHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let ingrt in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingrt) + '=' + encodeURIComponent(this.state.ingredients[ingrt]));
        }
        queryParams.push('price=' + this.state.totalPrice.toFixed(2));

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    };

    render() {
        const buttonDisabledInfo = {
            ...this.props.ingredients
        };
        for (let key in buttonDisabledInfo) {
            buttonDisabledInfo[key] = buttonDisabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <h2 style={{'text-align': 'center'}}>Ingredients cannot be load!</h2>
            : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        moreIngredient={this.props.onAddIngredient}
                        lessIngredient={this.props.onRemoveIngredient}
                        price={this.props.totalPrice}
                        disabled={buttonDisabledInfo}
                        purchasable={this.updatePurchasable()}
                        order={this.purchasingHandler}/>)
                </>);
            orderSummary = <OrderSummary purchaseCancelled={this.purchaseCancelHandler}
                                         purchaseContinued={this.purchaseContinueHandler}
                                         ingredients={this.props.ingredients}
                                         price={this.props.totalPrice.toFixed(2)}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.price
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch({
            type: actionType.ADD_INGREDIENT,
            ingredientName: ingredientName
        }),
        onRemoveIngredient: (ingredientName) => dispatch({
            type: actionType.REMOVE_INGREDIENT,
            ingredientName: ingredientName
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
