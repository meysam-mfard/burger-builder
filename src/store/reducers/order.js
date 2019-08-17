import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchasing: true
};

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionType.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false, purchasing: false});
        case actionType.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true});
        case actionType.PURCHASE_BURGER_INIT:
            return updateObject(state, {purchasing: true});
        case actionType.FETCH_ORDERS_START:
            return updateObject(state, {purchasing: true});
        case actionType.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {orders: action.orders, loading: false});
        case actionType.FETCH_ORDERS_FAIL:
            return updateObject(state, {loading: false});
        default:
            return state;
    }
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {
        orders: state.orders.concat(newOrder),//this is unnecessary; orders are fetch from server in order page
        loading: false,
        purchasing: false
    });
};

export default order;