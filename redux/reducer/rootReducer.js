import { combineReducers } from 'redux';
import products from './product';
import cart from './cart';
import wishlist from './wishlist';
import quickView from './quickView';
import compare from './compare';
import productFilters from './productFilters';
import auth from './auth';
import errors from './errors';
import loader from './loader';
import order from './order';
import detailsView from './detailsView';


const rootReducer = combineReducers({
  auth,
  products,
  cart,
  wishlist,
  quickView,
  compare,
  productFilters,
  errors,
  loader,
  order,
  detailsView

});

export default rootReducer;
