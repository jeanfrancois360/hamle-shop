// import fetch from 'isomorphic-unfetch'
import axios from '../../axios';
import filterProductList from '../../util/filterProduct';
import searchItemsByText from '../../util/searchItemsByText';
import * as Types from '../constants/actionTypes';

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
