import axios from '../../axios';
import * as Types from '../constants/actionTypes';
import { setErrors, clearErrors } from './errors';
import { openLoader, closeLoader } from './loader';

let baseUrl = '';
generateBaseUrl();
function generateBaseUrl() {
  baseUrl = window.location.origin;
}

export const clearMessage = () => {
  return {
    type: Types.CLEAR_MESSAGE,
  };
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

    dispatch({
      type: Types.LOGIN_SUCCESS,
      payload: response.data,
    });
    dispatch(closeLoader());
  } catch (error) {
    dispatch(
      setErrors({
        error: [],
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
    const response = await axios.post('/auth/logout', payload, {
      headers: {
        Authorization: 'Bearer ' + payload,
      },
    });
    if (response.status === 200) {
      localStorage.clear();
      window.location.replace(baseUrl + '/login');
    }
    dispatch({
      type: Types.LOGOUT_SUCCESS,
    });
    dispatch(closeLoader());
  } catch (error) {
    if (error.response.data.message == 'Unauthenticated.') {
      localStorage.clear();
      window.location.replace(baseUrl + '/login');
    }
    dispatch(closeLoader());
  }
};
