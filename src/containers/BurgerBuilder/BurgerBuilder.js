import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5,
    purchasable: false,
    purchasing: false
  };

  moreIngredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type]+1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchasable(updatedIngredients);
  };

  lessIngredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    if(updatedIngredients[type] <= 0)
      return;
    updatedIngredients[type] = this.state.ingredients[type]-1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchasable(updatedIngredients);
  };

  updatePurchasable = (ingredients) => {//ingredients is passed as arg to be able to get the latest state
    const totalIngrtCount = Object.values(ingredients)
      .reduce((count, currIngrCount) =>
        count + currIngrCount, 0);
    this.setState({purchasable: totalIngrtCount});
  };

  purchasingHandler = () => {
    this.setState({purchasing: true});
  };

  render() {
    const buttonDisabledInfo = {
      ...this.state.ingredients
    };
    for (let key in buttonDisabledInfo) {
      buttonDisabledInfo[key] = buttonDisabledInfo[key] <= 0;
    }

    return (
      <>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          moreIngredient={this.moreIngredientHandler}
          lessIngredient={this.lessIngredientHandler}
          price={this.state.totalPrice}
          disabled={buttonDisabledInfo}
          purchasable={this.state.purchasable}
          order={this.purchasingHandler}/>
      </>
    );
  }
}

export default BurgerBuilder;
