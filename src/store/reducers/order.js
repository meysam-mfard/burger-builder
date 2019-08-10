import * as actionType from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchasing: true
};

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),//this is unnecessary; orders are fetch from server in order page
                loading: false,
                purchasing: false
            };
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                purchasing: false
            };
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionType.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchasing: true
            };
        case actionType.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionType.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,

            };
        case actionType.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default order;