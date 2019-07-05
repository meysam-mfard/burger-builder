import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    let ingredientsArr = [];

    ingredientsArr.push(<BurgerIngredient type="bunTop" />);
    ingredientsArr.push(<BurgerIngredient type="cheese" />);
    ingredientsArr.push(<BurgerIngredient type="meat" />);
    ingredientsArr.push(<BurgerIngredient type="bunBottom" />);

    let ingredients = ingredientsArr.map(ing => ing);
    
    return (
      <div className={classes.Burger}>
          {ingredients}
      </div>  
    );
};

export default burger;