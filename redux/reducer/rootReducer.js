import { combineReducers } from 'redux';
import products from './product';
import cart from './cart';
import wishlist from './wishlist';
import quickView from './quickView';
import compare from './compare';
import productFilters from './productFilters';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  products,
  cart,
  wishlist,
  quickView,
  compare,
  productFilters,
});

export default rootReducer;
