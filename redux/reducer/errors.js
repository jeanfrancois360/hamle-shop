import * as Types from '../constants/actionTypes';

const initialState = {
  error: '',
  error_msg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        error_msg: action.payload.error_msg,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        error: '',
        error_msg: '',
      };
    default:
      return state;
  }
};
