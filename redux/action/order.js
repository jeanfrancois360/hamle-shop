// import fetch from 'isomorphic-unfetch'
import axios from '../../axios';
import * as Types from '../constants/actionTypes';
import { Logout } from './auth';
import { clearErrors, setErrors } from './errors';
import { closeLoader, openLoader } from './loader';

export const clearMessage = () => {
  return {
    type: Types.CLEAR_MESSAGE,
  };
};
export const addOrder = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post('/orders/create', payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    localStorage.setItem('order-details', JSON.stringify(response.data.data));

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

export const orderPayment = (payload, type) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    if (type == 'momo') {
      const response = await axios.post('/checkout', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch({
        type: Types.PAYMENT_REFERENCE,
        payload: response.data,
      });
    }
    if (type == 'card') {
      const response = await axios.post('/stripe-checkout', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      window.open(response.data.data.url, '_blank');
    }
  } catch (error) {
    if (error.response.data.message.includes('Unauthenticated')) {
      localStorage.setItem('prev_page', 'payment');
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

export const checkPaymentStatus = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post(
      `/payment/getTransactionStatus/${payload}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    dispatch({
      type: Types.PAID_ORDER,
      payload: response.data,
    });
  } catch (error) {
    if (error.response.data.message.includes('Unauthenticated')) {
      localStorage.setItem('prev_page', 'payment');
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
