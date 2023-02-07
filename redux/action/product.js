// import fetch from 'isomorphic-unfetch'
import axios from '../../axios';
import filterProductList from '../../util/filterProduct';
import searchItemsByText from '../../util/searchItemsByText';
import * as Types from '../constants/actionTypes';
import { Logout } from './auth';
import { clearErrors, setErrors } from './errors';
import { closeLoader, openLoader } from './loader';

export const clearMessage = () => {
  return {
    type: Types.CLEAR_MESSAGE,
  };
};

export const getProducts = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/index/${page}`);
    dispatch({
      type: Types.FETCHED_PRODUCTS,
      payload: {
        products: res.data.data.data,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    if (id !== undefined) {
      const res = await axios.get(`/products/show/${id}`);
      let products = [];
      products.push(res.data.data);
      dispatch({
        type: Types.FETCHED_PRODUCT,
        payload: {
          product: products,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Fetch Product By Catagory

export const fetchByCategory = async (url, filters) => {
  try {
    const sendRequest = await fetch(url);
    const data = await sendRequest.json();
    const filteredList = filterProductList(data, filters);

    return filteredList;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/categories/index/${page}`);
    dispatch({
      type: Types.FETCHED_CATEGORIES,
      payload: {
        categories: res.data.data.data,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getPlans = () => async (dispatch) => {
  try {
    const res = await axios.get(`/get-plan-lists`);
    dispatch({
      type: Types.FETCHED_PLANS,
      payload: {
        plans: res.data.data,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMyPlan = () => async (dispatch) => {
  try {
    const res = await axios.get(`/get-my-plan`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (res.data.data) {
      localStorage.setItem('my-plan', JSON.stringify(res.data.data));
    }
    dispatch({
      type: Types.FETCHED_MY_PLAN,
      payload: {
        plan: res.data.data,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const planSubscription = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post('/subscribe-to-a-plan', payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    console.log('subscription results: ', response.data);
    localStorage.removeItem('order-details');
    localStorage.removeItem('plan-details');
    localStorage.removeItem('order-type');
    localStorage.removeItem('hemle_cart');

    dispatch({
      type: Types.PLAN_SUBSCRIBED,
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

export const changePlan = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post('/change-my-plan', payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    localStorage.removeItem('order-details');
    localStorage.removeItem('plan-details');
    localStorage.removeItem('my-plan');
    localStorage.removeItem('order-type');
    localStorage.removeItem('hemle_cart');

    dispatch({
      type: Types.PLAN_SUBSCRIBED,
      payload: response.data,
    });
    dispatch(closeLoader());
  } catch (error) {
    if (error.response.data.message.includes('Unauthenticated')) {
      localStorage.setItem('prev_page', 'account');
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

export const cancelPlan = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post(
      '/cancel-my-plan',
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    localStorage.removeItem('my-plan');
    dispatch({
      type: Types.CANCEL_PLAN,
      payload: response.data,
    });
    dispatch(closeLoader());
  } catch (error) {
    if (error.response.data.message.includes('Unauthenticated')) {
      localStorage.setItem('prev_page', 'account');
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
export const renewPlan = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post(
      '/renew-my-plan',
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    localStorage.removeItem('order-details');
    localStorage.removeItem('plan-details');
    localStorage.removeItem('my-plan');
    localStorage.removeItem('order-type');
    localStorage.removeItem('hemle_cart');
    localStorage.removeItem('is_renewing');
    dispatch({
      type: Types.CANCEL_PLAN,
      payload: response.data,
    });
    dispatch(closeLoader());
  } catch (error) {
    if (error.response.data.message.includes('Unauthenticated')) {
      localStorage.setItem('prev_page', 'account');
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
