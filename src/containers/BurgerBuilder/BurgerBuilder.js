import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.2
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5
  };

  moreIntgredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type]+1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
  };

  lessIntgredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    if(updatedIngredients[type] <= 0)
      return;
    updatedIngredients[type] = this.state.ingredients[type]-1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
  };

  render() {
    const buttonDisacbledInfo = {
      ...this.state.ingredients
    };
    for (let key in buttonDisacbledInfo) {
      buttonDisacbledInfo[key] = buttonDisacbledInfo[key] <= 0;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          moreIntgredient={this.moreIntgredientHandler}
          lessIntgredient={this.lessIntgredientHandler}
          disabled={buttonDisacbledInfo} />
      </>
    );
  }
}

export default BurgerBuilder;
