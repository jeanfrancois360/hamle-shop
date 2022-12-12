import axios from '../../axios';
import * as Types from '../constants/actionTypes';
import { setErrors, clearErrors } from './errors';
import { openLoader, closeLoader } from './loader';

export const clearMessage = () => {
  return {
    type: Types.CLEAR_MESSAGE,
  };
};

// Action for creating a user account
export const SignUp = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post('/auth/register', payload);
    dispatch({
      type: Types.REGISTER,
      payload: response.data,
    });
    dispatch(closeLoader());
  } catch (error) {
    dispatch(
      setErrors({
        error: error.response.data.errors,
        error_msg: error.response.data.message,
      })
    );
    dispatch(closeLoader());
  }
};

// Action for logging in a user
export const SignIn = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post('/auth/login', payload);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('isAuthenticated', true);

    // Setting up temporary axios authorization token
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    let prev_page = localStorage.getItem('prev_page');
    if (prev_page) {
      window.location.replace(`/${prev_page}`);
      localStorage.removeItem('prev_page');
    } else {
      window.location.replace('/');
    }

    dispatch({
      type: Types.LOGIN,
      payload: response.data,
    });
    dispatch(closeLoader());
  } catch (error) {
    dispatch(
      setErrors({
        error: error.response.data.errors,
        error_msg: error.response.data.message,
      })
    );
    dispatch(closeLoader());
  }
};

// Action for signing out a user
export const Logout = (payload) => async (dispatch) => {
  dispatch(openLoader());
  try {
    const response = await axios.post('/logout', {
      headers: {
        Authorization: 'Bearer ' + payload,
      },
    });
    if (response.status === 200) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      window.location.reload();
    }
    dispatch({
      type: Types.LOGOUT_SUCCESS,
    });
    dispatch(closeLoader());
  } catch (error) {
    if (error && error.response.data.message == 'Unauthenticated.') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      //window.location.replace('/login');
    }
    dispatch(closeLoader());
  }
};
