/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import CategoryButtons from '../Components/CategoryButtons';
import BeverageAPI from '../services/BeverageRecipesAPI';
import { setList12 } from '../services/services';
import Loading from '../Components/Loading';

function Drinks(props) {
  const { getByDefault, getByCategory } = BeverageAPI;
  const [mainDrinks, setMainDrinks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { drinks } = props;

  React.useEffect(() => {
    getByCategory()
      .then(setCategories)
      .then(() => setLoading(false));

    if (!drinks.length) {
      getByDefault()
        .then((res) => setMainDrinks(setList12(res)));
    }
  }, []);

  React.useEffect(() => {
    if (drinks.length) {
      setMainDrinks(setList12(drinks));
    }
  }, [drinks]);

  return loading ? <Loading /> : (
    <div className="tela-drink">
      <HeadBar title="Bebidas" />
      <CategoryButtons
        setMainDrinks={ (list) => setMainDrinks(setList12(list)) }
        type="cocktail"
        categories={ categories.map((category) => category.strCategory) }
      />
      <div className="tela-cards">
        <div className="items-list">
          {mainDrinks.map((drink, index) => (
            <Card
              title="bebidas"
              key={ index }
              index={ index }
              item={ drink }
              type="drinks"
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  drinks: state.drinks.list,
});

Drinks.propTypes = PropTypes.shape({}).isRequired;
export default connect(mapStateToProps)(Drinks);
