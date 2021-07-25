import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';
import ingredients from './ingredients';
import mealsArea from './mealsArea';
import details from './details';
import done from './done';

const rootReducer = combineReducers({
  mealsArea, user, foods, drinks, ingredients, details, done,
});

export default rootReducer;
