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
        message:
          'Registered successfully! Now check your email to verify your account.',
      };
    case Types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        message: "You're logged in successfully!",
      };
    case Types.UPDATE_ACCOUNT:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        message: 'Account updated successfully!',
      };
    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: null,
        message: '',
      };
    case Types.DELETE_ACCOUNT:
      return {
        ...state,
        message: 'Account deleted successfully!',
      };
    case Types.VERIFY_ACCOUNT:
      return {
        ...state,
        message: 'Account verified successfully!',
      };
    case Types.REQUEST_RESET_PASSWORD:
      return {
        ...state,
        message: action.payload.message,
      };
    case Types.RESET_PASSWORD:
      return {
        ...state,
        message: 'Your password has been reset!',
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


