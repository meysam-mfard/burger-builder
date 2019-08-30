import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
import {updateObject, checkValidity} from "../../shared/utility";

const Auth = (props) => {
    const {buildingBurger, authRedirectPath, setAuthRedirectPath} = props;

    const [authForm, setAuthForm] = useState({
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
    });

    const [isSignUp, setIsSignUp] = useState(true);

    const inputChangeHandler = (event, elementId) => {

        const updatedAuthForm = updateObject(authForm, {
            [elementId]: updateObject(authForm[elementId], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[elementId].validation),
                touched: true
            })
        });
        setAuthForm(updatedAuthForm);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
    };

    const switchAuthMethodHandler = () => {
        setIsSignUp(!isSignUp);
    };

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            setAuthRedirectPath();//redirect to '/'
        }
    }, [buildingBurger, authRedirectPath, setAuthRedirectPath]);

    const formElementArray = [];
    for (let key in authForm) {
        formElementArray.push({
            id: key,
            config: authForm[key]
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
               changed={(event) => inputChangeHandler(event, formElement.id)}/>
    ));

    if (props.loading) {
        formElements = <Spinner/>
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p style={{color: 'red', fontWeight: 'bold'}}>{props.error.message}</p>
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {formElements}
                <Button btnType="Success">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthMethodHandler}>
                Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
        </div>
    );
};

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