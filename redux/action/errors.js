import * as Types from '../constants/actionTypes';

export const setErrors = (error) => {
  return {
    type: Types.SET_ERROR,
    payload: error,
  };
};

export const clearErrors = () => {
  return {
    type: Types.CLEAR_ERROR,
  };
};
