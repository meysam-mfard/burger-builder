import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            deliveryMethod: 'fastest',
            customer: {
                name: 'customer1',
                address: {
                    street: 'dummy street',
                    zipCode: '123456',
                    city: 'Stockholm'
                },
                email: 'customer1@email.com'
            }
        };

        axios.post('orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    };

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name"/>
                <input type="email" name="email" placeholder="Your Email"/>
                <input type="text" name="street" placeholder="Street"/>
                <input type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Please Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;