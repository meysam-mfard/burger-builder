import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

  const ingredients = Object.keys(props.ingredients)
    .map( key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
        </li> );
    } );

  return (
    <>
      <h3>Order Summary</h3>
      <p>Your burger contains following ingredients:</p>
      <ul>
        {ingredients}
      </ul>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </>
  );
};

export default orderSummary;