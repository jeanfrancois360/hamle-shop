import { deleteProduct, findProductIndexById } from '../../util/util';
import * as Types from '../constants/actionTypes';

const initialState = {
  items: [],
  item: {},
  message: '',
  payment_ref: null,
  payment_status: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCHED_ORDERS: {
      return {
        ...state,
        items: [...action.payload.products],
      };
    }
    case Types.FETCHED_ORDER: {
      return {
        ...state,
        item: [...action.payload.product],
      };
    }
    case Types.ADD_ORDER: {
      return {
        ...state,
        message: 'Order saved successfully!',
      };
    }
    case Types.PAYMENT_REFERENCE: {
      return {
        ...state,
        payment_ref: action.payload,
      };
    }
    case Types.PAID_ORDER: {
      return {
        ...state,
        payment_status: action.payload,
      };
    }

    case Types.ADD_PRODUCT: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case Types.CANCEL_ORDER:
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
    default:
      return state;
  }
};
