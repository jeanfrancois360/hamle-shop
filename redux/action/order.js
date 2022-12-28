// import fetch from 'isomorphic-unfetch'
import axios from '../../axios';
import * as Types from '../constants/actionTypes';
import { clearMessage, Logout } from './auth';
import { clearErrors, setErrors } from './errors';
import { closeLoader, openLoader } from './loader';

export const addOrder = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post('/orders/create', payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch({
      type: Types.ADD_ORDER,
      payload: response.data,
    });
    dispatch(closeLoader());
  } catch (error) {
    if (error.response.data.message.includes('Unauthenticated')) {
      localStorage.setItem('prev_page', 'checkout');
      dispatch(Logout());
    }
    dispatch(
      setErrors({
        error: error.response.data.errors,
        error_msg: error.response.data.message,
      })
    );
    dispatch(closeLoader());
  }
};

export const getOrders = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const res = await axios.get('/orders/my-orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch({
      type: Types.FETCHED_ORDERS,
      payload: {
        products: res.data.data,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOrder = (id) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    if (id !== undefined) {
      const res = await axios.get(`/orders/show/${id}`);
      let products = [];
      products.push(res.data.data);
      dispatch({
        type: Types.FETCHED_ORDER,
        payload: {
          product: products,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
