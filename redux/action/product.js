// import fetch from 'isomorphic-unfetch'
import axios from '../../axios';
import filterProductList from '../../util/filterProduct';
import searchItemsByText from '../../util/searchItemsByText';
import * as Types from '../constants/actionTypes';
import product from '../reducer/product';

export const getProducts = (total) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/index/${total}`);
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

// Fetch Product fetchProduct
export const fetchProduct = (searchTerm, url, filters) => async (dispatch) => {
  try {
    const sendRequest = await fetch(url);
    const data = await sendRequest.json();

    window.products = data;

    const searchedItems = searchItemsByText(searchTerm, data);
    const filteredList = filterProductList(searchedItems, filters);

    dispatch({
      type: Types.FETCHED_PRODUCT,
      payload: { products: filteredList },
    });
  } catch (error) {
    console.log(error);
  }
};

// Fetch More Product
export const fetchMoreProduct = (url, total) => async (dispatch) => {
  try {
    const sendRequest = await fetch(url);
    const data = await sendRequest.json();

    // const searchedItems = searchItemsByText(searchTerm,data)
    // const filteredList  = filterProductList(searchedItems,filters)

    dispatch({
      type: Types.FETCHED_MORE_PRODUCT,
      payload: { products: data, total },
    });
  } catch (error) {
    console.log(error);
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
