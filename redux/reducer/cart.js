import storage from '../../util/localStorage';
import { deleteProduct, findProductIndexById } from '../../util/util';
import * as Types from '../constants/actionTypes';

export default (state = [], action) => {
  let index = null;

  switch (action.type) {
    case Types.INIT_LOCALSTORAGE:
      return [...action.payload.cart];

    case Types.ADD_TO_CART: {
      index = findProductIndexById(state, action.payload.product.id);

      if (index !== -1) {
        state[index].qty += 1;
        storage.set('hemle_cart', [...state]);

        return [...state];
      } else {
        if (!action.payload.product.qty) {
          action.payload.product.qty = 1;
        }
        storage.set('hemle_cart', [...state, action.payload.product]);

        return [...state, action.payload.product];
      }
    }

    case Types.DELETE_FROM_CART: {
      const newCartItems = deleteProduct(state, action.payload.productId);
      storage.set('hemle_cart', newCartItems);

      return [...newCartItems];
    }
    case Types.INCREASE_QUANTITY: {
      index = findProductIndexById(state, action.payload.productId);
      if (index === -1) return state;

      state[index].qty += 1;
      storage.set('hemle_cart', [...state]);

      return [...state];
    }
    case Types.DECREASE_QUANTITY: {
      index = findProductIndexById(state, action.payload.productId);
      if (index === -1) return state;

      const qty = state[index].qty;
      if (qty > 1) state[index].qty -= 1;
      storage.set('hemle_cart', [...state]);

      return [...state];
    }
    case Types.CLEAR_CART: {
      storage.set('hemle_cart', []);
      return [];
    }
    default:
      return state;
  }
};
