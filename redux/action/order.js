// import fetch from 'isomorphic-unfetch'
import axios from '../../axios';
import * as Types from '../constants/actionTypes';
import { clearMessage, Logout } from './auth';
import { clearErrors, setErrors } from './errors';
import { closeLoader, openLoader } from './loader';

export const addOrder = (payload) => async (dispatch) => {
  console.log({ payload });
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
    console.log(error.response.data.message);
    if (error.response.data.message.includes('Unauthenticated')) {
      localStorage.setItem('prev_page', 'shop-cart');
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

export const getOrders = (page) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const res = await axios.get(`/orders/index/${page}`);
    dispatch({
      type: Types.FETCHED_ORDERS,
      payload: {
        products: res.data.data.data,
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

export const cancelOrder = (id) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    if (id !== undefined) {
      const res = await axios.get(`/orders/delete/${id}`);
      if (res) {
        dispatch({
          type: Types.CANCEL_ORDER,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
