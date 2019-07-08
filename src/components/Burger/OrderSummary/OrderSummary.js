import React from 'react';

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
    </>
  );
};

export default orderSummary;