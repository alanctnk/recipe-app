/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DetailsProgress from '../Components/DetailsProgress';
import { GetRecipesDone } from '../redux/actions';
import DrinkApi from '../services/BeverageRecipesAPI';
import MealAPI from '../services/MealRecipesAPI';
import { setDoneRecipes } from '../services/services';
import BtnVoltar from '../Components/BtnVoltar';

function Progress(props) {
  const { match: { params: { id } } } = props;
  const { setDrinkDone, setFoodDone, checked } = props;
  const strType = window.location.href.includes('comidas') ? 'Meal' : 'Drink';
  const [disabled, setDisabled] = React.useState(false);
  const [typeDone, setTypeDone] = useState('');

  const API = window.location.href.includes('comidas')
    ? MealAPI.getFoodById : DrinkApi.getDrinkById;

  // const {cocktails}  = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const doneId = Object.keys(cocktails);

  useEffect(() => {
    if (strType === 'Meal') {
      setFoodDone(id);
      setTypeDone('comida');
    } else {
      setDrinkDone(id);
      setTypeDone('bebida');
    }
  }, []);

  return (
    <div className="tela-progress">
      <BtnVoltar />
      <DetailsProgress
        id={ id }
        fetchAPI={ API }
        type={ strType }
        setDisabled={ setDisabled }
      />

      <Link to="/receitas-feitas">
        <button
          type="button"
          className="btn-finalizar"
          data-testid="finish-recipe-btn"
          onClick={ () => { setDoneRecipes(checked, typeDone); } }
          disabled={ disabled }
        >
          Finalizar receita
        </button>
      </Link>
    </div>

  );
}

Progress.propTypes = PropTypes.shape({}).isRequired;

const mapStateToProps = (state) => ({
  item: state.details.item,
  checked: state.done[0],
  redirect: state.details.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  setDrinkDone: (value) => dispatch(GetRecipesDone(value, DrinkApi.getDrinkById)),
  setFoodDone: (value) => dispatch(GetRecipesDone(value, MealAPI.getFoodById)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
