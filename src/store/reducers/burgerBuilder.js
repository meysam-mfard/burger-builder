import * as actionType from '../actions/actionTypes';

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

const calculatePrice = (ingredients) => {
    let price = initialState.price;
    for (let ingKey in INGREDIENT_PRICES) {
        price += ingredients[ingKey] * INGREDIENT_PRICES[ingKey];
    }
    return price;
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionType.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredientName] <= 0) {
                return state;
            }
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                price: calculatePrice(action.ingredients),
                error: false
            };
        case actionType.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default burgerBuilder;