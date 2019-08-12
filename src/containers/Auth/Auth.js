import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address',
                },
                label: 'Your Email',
                value: '',
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                label: 'Your Password',
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.isRequired) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    };

    inputChangeHandler = (event, elementId) => {

        const updatedAuthForm = {
            ...this.state.authForm,
            [elementId]: {
                ...this.state.authForm[elementId],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authForm[elementId].validation),
                touched: true
            }
        };

        this.setState({authForm: updatedAuthForm});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value);
    };

    render() {

        const formElementArray = [];
        for (let key in this.state.authForm) {
            formElementArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }

        const formElements = formElementArray.map(formElement => (
            <Input key={formElement.id}
                   label={formElement.config.label}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {formElements}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(null, mapDispatchToProps)(Auth);