import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

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

    const dispatch = useDispatch();
    const onAddIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onRemoveIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const onInitPurchase = () => dispatch(actions.initPurchase());
    const setAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    //useCallback is used to avoid unnecessary re-rendering by useEffect
    const initIngredients = useCallback( () => dispatch(actions.initIngredients()), [dispatch]);

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.price);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

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
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            setAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

        const buttonDisabledInfo = {
            ...ingredients
        };
        for (let key in buttonDisabledInfo) {
            buttonDisabledInfo[key] = buttonDisabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = error ? <h2 style={{'text-align': 'center'}}>Ingredients cannot be loaded!</h2>
            : <Spinner/>;

        if (ingredients) {
            burger = (
                <>
                    <Burger ingredients={ingredients}/>
                    <BuildControls
                        moreIngredient={onAddIngredient}
                        lessIngredient={onRemoveIngredient}
                        price={totalPrice}
                        disabled={buttonDisabledInfo}
                        purchasable={updatePurchasable(ingredients)}
                        order={purchasingHandler}
                        isAuthenticated={isAuthenticated}/>)
                </>);
            orderSummary = <OrderSummary purchaseCancelled={purchaseCancelHandler}
                                         purchaseContinued={purchaseContinueHandler}
                                         ingredients={ingredients}
                                         price={totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder, axios);
