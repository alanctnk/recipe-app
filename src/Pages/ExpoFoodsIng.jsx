import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../Components/Footer';
import IngredientsFoodsTab from '../Components/IngredientsFoodsTab';
import { getIngredient } from '../redux/actions';
import MealRecipesAPI from '../services/MealRecipesAPI';
import Loading from '../Components/Loading';
import HeadBar from '../Components/HeadBar';

function ExpoFoodsIng(props) {
  const { ingredientsCatcher, ingredients } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      ingredientsCatcher();
      setLoading(false);
    }
  }, [ingredientsCatcher, setLoading, loading]);

  return loading ? <Loading /> : (
    <div className="tela-explore">
      <HeadBar title="Ingredientes" />
      <IngredientsFoodsTab ingredients={ ingredients } />
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  ingredientsCatcher: () => dispatch(getIngredient(MealRecipesAPI.foodIngredients)),
});

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.list,
});

ExpoFoodsIng.propTypes = {
  ingredients: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpoFoodsIng);
