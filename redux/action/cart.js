import axios from '../../axios';
import * as Types from '../constants/actionTypes';
import storage from '../../util/localStorage';
import { clearErrors, setErrors } from './errors';

export const addToCart = (product) => async (dispatch) => {
  const res1 = await axios.get(`/cards/get-my-card`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  let payload = {
    product_id: product.id,
    quantity: 1,
    card_id: res1.data.data[0].id,
    size: 'XL',
  };

  const res2 = await axios.post('/cardProducts/add-to-card', payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  dispatch({
    type: Types.ADD_TO_CART,
    payload: { product },
  });
};

export const deleteFromCart = (productId) => async (dispatch) => {
  try {
    const res1 = await axios.get(`/cards/get-my-card`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (res1.data.data[0].product_card.length > 0) {
      let d = res1.data.data[0].product_card.filter(
        (d) => d.product_id == productId
      );
      const res2 = await axios.delete(`/cardProducts/delete/${d[0].id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    }
    dispatch({
      type: Types.DELETE_FROM_CART,
      payload: { productId },
    });
  } catch (error) {
    dispatch(
      setErrors({
        error: error.response.data.errors,
        error_msg: error.response.data.message,
      })
    );
  }
};

export const increaseQuantity = (productId) => async (dispatch) => {
  try {
    const res1 = await axios.get(`/cards/get-my-card`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (res1.data.data[0].product_card.length > 0) {
      let d = res1.data.data[0].product_card.filter(
        (d) => d.product_id == productId
      );
      let newQuantity = parseInt(d[0].quantity) + 1;
      let payload = {
        quantity: newQuantity,
        size: 'XL',
      };
      const res2 = await axios.patch(
        `/cardProducts/update/${d[0].id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
    }

    dispatch({
      type: Types.INCREASE_QUANTITY,
      payload: { productId },
    });
  } catch (error) {
    dispatch(
      setErrors({
        error: error.response.data.errors,
        error_msg: error.response.data.message,
      })
    );
  }
};

export const decreaseQuantity = (productId) => async (dispatch) => {
  try {
    const res1 = await axios.get(`/cards/get-my-card`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (res1.data.data[0].product_card.length > 0) {
      let d = res1.data.data[0].product_card.filter(
        (d) => d.product_id == productId
      );
      let newQuantity = parseInt(d[0].quantity) - 1;
      let payload = {
        quantity: newQuantity,
        size: 'XL',
      };
      const res2 = await axios.patch(
        `/cardProducts/update/${d[0].id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
    }
    dispatch({
      type: Types.DECREASE_QUANTITY,
      payload: { productId },
    });
  } catch (error) {
    dispatch(
      setErrors({
        error: error.response.data.errors,
        error_msg: error.response.data.message,
      })
    );
  }
};

export const openCart = () => (dispatch) => {
  dispatch({
    type: Types.OPEN_CART,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_CART,
  });
};

export const closeCart = () => (dispatch) => {
  dispatch({
    type: Types.CLOSE_CART,
  });
};
