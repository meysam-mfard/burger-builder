import * as actionType from './actions';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.6,
    cheese: 0.4,
    meat: 1.2
};

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    price: 5
};

const reducer = (state = initialState, action) => {
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
        default:
            return state;
    }
};

export default reducer;