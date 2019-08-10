import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.6,
    cheese: 0.4,
    meat: 1.2
};

const initialState = {
    ingredients: null,
    price: 5,
    error: false
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionType.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionType.FETCH_INGREDIENT_FAILED:
            return updateObject(state, {error: true});
        default:
            return state;
    }
};

const calculatePrice = (ingredients) => {
    let price = initialState.price;
    for (let ingKey in INGREDIENT_PRICES) {
        price += ingredients[ingKey] * INGREDIENT_PRICES[ingKey];
    }
    return price;
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updateState = updateObject(state, {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[action.ingredientName]
    });
    return updateObject(state, updateState);
};

const removeIngredient = (state, action) => {
    if (state.ingredients[action.ingredientName] <= 0) {
        return state;
    };
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updateState = updateObject(state, {
        ingredients: updatedIngredients,
        price: state.price - INGREDIENT_PRICES[action.ingredientName]
    });
    return updateObject(state, updateState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        price: calculatePrice(action.ingredients),
        error: false
    });
};

export default burgerBuilder;