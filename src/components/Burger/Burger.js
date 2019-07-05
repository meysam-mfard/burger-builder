import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    
    const ingredients = Object.keys(props.ingredients).map( ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map( (_, index) => {
            return <BurgerIngredient key={ingredientKey+index} type={ingredientKey} />;
        });
    });
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bunTop' />
            {ingredients}
            <BurgerIngredient type='bunBottom' />
        </div>
    );
};

export default burger;