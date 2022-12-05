import { deleteProduct, findProductIndexById } from '../../util/util';
import * as Types from '../constants/actionTypes';

// {items:[],filteredList:[]}

export default (state = { items: [], item: {}, filteredItems: [] }, action) => {
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
    default:
      return state;
  }
};
