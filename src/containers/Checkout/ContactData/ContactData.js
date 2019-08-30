import React, {useState} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions";
import withErrorHandler from "../../../HOC/withErrorHandler";
import {updateObject, checkValidity} from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name',
            },
            label: 'Your Name',
            value: '',
            validation: {
                isRequired: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street',
            },
            label: 'Street',
            value: '',
            validation: {
                isRequired: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code',
            },
            label: 'Zip Code',
            value: '',
            validation: {
                isRequired: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country',
            },
            label: 'Country',
            value: '',
            validation: {
                isRequired: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'Email',
                placeholder: 'Your Email',
            },
            label: 'Email',
            value: '',
            validation: {
                isRequired: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ],
            },
            label: 'Delivery Method',
            value: 'fastest',
            validation: {},
            valid: true
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault(); //to avoid page refresh (default behaviour)

        const formData = {};
        for (let formElementId in orderForm) {
            formData[formElementId] = orderForm[formElementId].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };

        props.onOrder(order, props.token);
    };

    const inputChangeHandler = (event, inputId) => {
        const updatedFormElement = updateObject(orderForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputId].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputId]: updatedFormElement
        });

        let isFormValid = true;
        for (let inputId in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputId].valid && isFormValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(isFormValid);
    };

    const formElementArray = [];
    for (let key in orderForm) {
        formElementArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form>
            {formElementArray.map(formElement => (
                <Input key={formElement.id}
                       label={formElement.config.label}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validation}
                       touched={formElement.config.touched}
                       changed={(event) => inputChangeHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!formIsValid} clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner/>;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Please Enter Your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));