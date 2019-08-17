import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
import {updateObject, checkValidity} from "../../shared/utility";

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
        },
        isSignUp: true
    };

    inputChangeHandler = (event, elementId) => {

        /*const updatedAuthForm = {
            ...this.state.authForm,
            [elementId]: {
                ...this.state.authForm[elementId],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.authForm[elementId].validation),
                touched: true
            }
        };*/
        const updatedAuthForm = updateObject(this.state.authForm, {
            [elementId]: updateObject(this.state.authForm[elementId], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.authForm[elementId].validation),
                touched: true
            })
        });

        this.setState({authForm: updatedAuthForm});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    };

    switchAuthMethodHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath();//redirect to '/'
        }
    }

    render() {

        const formElementArray = [];
        for (let key in this.state.authForm) {
            formElementArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }

        let formElements = formElementArray.map(formElement => (
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

        if (this.props.loading) {
            formElements = <Spinner/>
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p style={{color: 'red', fontWeight: 'bold'}}>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {formElements}
                    <Button btnType="Success">{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthMethodHandler}>
                    Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.redirectPath,
        buildingBurger: state.burgerBuilder.buildingBurger
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);