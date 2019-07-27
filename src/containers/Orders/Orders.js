import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(response => {
                let tempState = [];
                for (let dataKey in response.data) {
                    tempState.push({
                        ...response.data[dataKey],
                        id: dataKey
                    });
                }
                this.setState({orders: tempState, loading: false});
            })
            .catch(error => {
                this.setState({loading: false});
                console.error(error);
            })
    }

    render() {
        let orders = <Spinner/>;
        if (!this.state.loading) {
            orders = [...this.state.orders].map(order =>
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
            );
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);