import React from 'react';

import Burger from '../../Burger/Burger';
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = props => (
    <div className={classes.CheckoutSummary}>
        <h1>Enjoy Your Burger</h1>
        <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
            <Button btnType='Danger' clicked={props.cancelClicked}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continueClicked}>CONTINUE</Button>
        </div>
    </div>
)

export default CheckoutSummary;