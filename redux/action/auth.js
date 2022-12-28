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
      window.location.replace('/login');
    }
    dispatch(closeLoader());
  }
};

// Action for signing out a user
export const DeleteAccount = (payload) => async (dispatch) => {
  dispatch(openLoader());
  try {
    const response = await axios.post(
      '/users/delete-my-account',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + payload,
        },
      }
    );
    console.log({ response });
    if (response.status === 200) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    }
    dispatch({
      type: Types.DELETE_ACCOUNT,
    });
    dispatch(closeLoader());
  } catch (error) {
    if (error && error.response.data.message == 'Unauthenticated.') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      window.location.replace('/login');
    }
    dispatch(closeLoader());
  }
};

// Action for updating a user account
export const UpdateAccount = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post('/users/update-my-account', payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch({
      type: Types.UPDATE_ACCOUNT,
      payload: response.data.data,
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

// Action for updating a user account
export const ChangePassword = (payload) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.post('/users/change-my-password', payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch({
      type: Types.RESET_PASSWORD,
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

export const VerifyAccount = (code) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(openLoader());
  clearMessage();
  try {
    const response = await axios.get(`/user/verify/${code}`);
    if (response) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('isAuthenticated', true);

      // Setting up temporary axios authorization token
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
      let prev_page = localStorage.getItem('prev_page');
      if (prev_page) {
        window.location.replace(`/${prev_page}`);
        localStorage.removeItem('prev_page');
      } else {
        window.location.replace('/');
      }
      dispatch({
        type: Types.VERIFY_ACCOUNT,
      });
    }
  } catch (error) {
    console.error(error);
    dispatch(
      setErrors({
        error: error.response.data.errors,
        error_msg: error.response.data.message,
      })
    );
  }
};
