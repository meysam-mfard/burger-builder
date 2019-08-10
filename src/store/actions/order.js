import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
};

export const initPurchase = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
};

export const fetchOrdersStart = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('orders.json')
            .then(response => {
                let fetchedOrders = [];
                for (let dataKey in response.data) {
                    fetchedOrders.push({
                        ...response.data[dataKey],
                        id: dataKey
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            })
    }
};