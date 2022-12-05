import * as Types from '../constants/actionTypes';

const initialState = {
  user: [],
  token: null,
  message: '',
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.REGISTER:
      return {
        ...state,
        message: 'Registered successfully!',
      };
    case Types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        message: "You're logged in successfully!",
      };
    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: null,
        message: '',
      };
    case Types.CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
      };

    default:
      return state;
  }
};
