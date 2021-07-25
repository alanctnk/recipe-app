import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../styles/Done.css';
import Header from '../Components/Header';

export default function RecipesMade() {
  const [copy, setCopy] = useState(false);
  const itensDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [DoneRecipes, setDoneRecipes] = useState(itensDone);

  function filterRecipes(option) {
    const filterSelected = !option
      ? itensDone
      : itensDone.filter((recipe) => option === recipe.type);
    setDoneRecipes(filterSelected);
  }

  function copyLinkRecipe(recipe) {
    clipboard(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopy(true);
  }
  // return DoneRecipes.length === 0 ? <div> loading... </div> : (
  return (
    <div className="tela-profile">
      <Header title="Receitas Feitas" />
      <section className="menu-favorites">
        <button
          type="button"
          className="btn-favorites"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('') }
        >
          All
        </button>
        <button
          type="button"
          className="btn-favorites"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Food
        </button>
        <button
          type="button"
          className="btn-favorites"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Drink
        </button>
      </section>
      <main className="items-list">
        {DoneRecipes.map((item, index) => (
          <div className="card" key={ `${item}${index}` }>
            <div className="card-feito">
              <Link
                to={ `/${item.type}s/${item.id}` }
              >
                <img
                  id={ index }
                  alt={ item.name }
                  src={ item.image }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="btns-f-c">
                <Link
                  className="titulos titulo-favorites"
                  to={ `/${item.type}s/${item.id}` }
                  data-testid={ `${index}-horizontal-name` }
                >
                  {item.name}
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { item.type === 'bebida'
                    ? item.alcoholicOrNot : `${item.area} - ${item.category}`}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
                { item.tags.length === null ? <p>nada</p> : item.tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))}
                <button
                  type="button"
                  className="btn-search"
                  onClick={ () => copyLinkRecipe(item) }
                >
                  <img
                    src={ shareIcon }
                    alt="Share Button"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                  {copy && <p className="textos">Link copiado!</p>}
                </button>
              </div>

            </div>
          </div>
        ))}
      </main>

    </div>
  );
}
