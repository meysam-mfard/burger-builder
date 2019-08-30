import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {
//export is used to be able to access this component in its test file without redux connect in the way

    const [purchasing, setPurchasing] = useState(false);
    const {initIngredients} = props;

    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const updatePurchasable = (ingredients) => {
        const totalIngrtCount = Object.values(ingredients)
            .reduce((count, currIngrCount) =>
                count + currIngrCount, 0);
        return totalIngrtCount > 0;
    };

    const purchasingHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.setAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

        const buttonDisabledInfo = {
            ...props.ingredients
        };
        for (let key in buttonDisabledInfo) {
            buttonDisabledInfo[key] = buttonDisabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = props.error ? <h2 style={{'text-align': 'center'}}>Ingredients cannot be loaded!</h2>
            : <Spinner/>;

        if (props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={props.ingredients}/>
                    <BuildControls
                        moreIngredient={props.onAddIngredient}
                        lessIngredient={props.onRemoveIngredient}
                        price={props.totalPrice}
                        disabled={buttonDisabledInfo}
                        purchasable={updatePurchasable(props.ingredients)}
                        order={purchasingHandler}
                        isAuthenticated={props.isAuthenticated}/>)
                </>);
            orderSummary = <OrderSummary purchaseCancelled={purchaseCancelHandler}
                                         purchaseContinued={purchaseContinueHandler}
                                         ingredients={props.ingredients}
                                         price={props.totalPrice}/>;
        }

        return (
            <>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.initPurchase()),
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
