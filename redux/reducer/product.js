import { deleteProduct, findProductIndexById } from '../../util/util';
import * as Types from '../constants/actionTypes';

// {items:[],filteredList:[]}

export default (
  state = {
    items: [],
    item: {},
    filteredItems: [],
    categories: [],
    plans: [],
    plan: {},
  },
  action
) => {
  switch (action.type) {
    case Types.FETCHED_PRODUCTS: {
      return {
        ...state,
        items: [...action.payload.products],
      };
    }
    case Types.FETCHED_PRODUCT: {
      return {
        ...state,
        item: [...action.payload.product],
      };
    }
    case Types.ADD_PRODUCT: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case Types.DELETE_PRODUCT:
      return deleteProduct(state, action.payload.id);

    case Types.UPDATE_PRODUCT: {
      const index = findProductIndexById(state, action.payload.product.id);
      state[index] = action.payload.product;
      return { ...state };
    }
    case Types.FETCHED_CATEGORIES: {
      return {
        ...state,
        categories: [...action.payload.categories],
      };
    }
    case Types.PLAN_SUBSCRIBED: {
      return {
        ...state,
        message: 'Subscribed successfully',
      };
    }
    case Types.FETCHED_PLANS: {
      return {
        ...state,
        plans: [...action.payload.plans],
      };
    }
    case Types.FETCHED_MY_PLAN: {
      return {
        ...state,
        plan: action.payload.plan,
      };
    }
    case Types.CANCEL_PLAN: {
      return {
        ...state,
        message: 'Plan canceled successfully',
        plan: {}
      };
    }
    default:
      return state;
  }
};
