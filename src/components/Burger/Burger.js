import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
   
    let burgerIngredientComponents = Object.keys(props.ingredients).map(
        ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map(
                (_, index) => {
                    return (
                        <BurgerIngredient
                            key={ingredientKey + index}
                            type={ingredientKey}
                        />
                    );
                }
            );
        }
    ).reduce(
        (arr, currElmt) => {
            return arr.concat(currElmt);
        } , []
    );

    if(burgerIngredientComponents.length === 0)
        burgerIngredientComponents = <p>Please add ingredients!</p>

    console.log(burgerIngredientComponents);
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bunTop' />
            {burgerIngredientComponents}
            <BurgerIngredient type='bunBottom' />
        </div>
    );
};

export default burger;